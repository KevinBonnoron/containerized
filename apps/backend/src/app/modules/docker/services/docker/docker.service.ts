import { jsonStreamParser, stringMatcher } from '@containerized/shared';
import { Injectable } from '@nestjs/common';
import type { ContainerCreateOptions, ContainerInspectInfo, ContainerListOptions, DockerOptions, default as Dockerode, NetworkCreateOptions, Volume, VolumeCreateOptions } from 'dockerode';
import { default as Docker } from 'dockerode';
import { DockerEventsAdapter } from '../../adapters';
import type { DockerGateway } from '../../gateways';
import type { ListContainersOptions, ListImagesOptions, ListVolumesOptions, PruneContainersOptions, PruneImagesOptions, PullImageOptions, SystemInfo, SystemPing, VolumeInspectInfo, VolumePruneOptions } from '../../types';
import { followProgress } from '../../utils';

@Injectable()
export class DockerService {
  private readonly events = [];

  constructor(
    private readonly docker: Docker,
    readonly dockerGateway: DockerGateway
  ) {
    docker.getEvents({}, (error, result) => {
      if (error) {
        throw error;
      }

      const parser = jsonStreamParser();
      result.on('data', (chunk) => {
        parser.add(chunk.toString('utf8'));
        const json = parser.tryParse();
        if (json) {
          const event = DockerEventsAdapter.toDto(json);
          dockerGateway.onEvent(event);
          this.events.push(event);
        }
      });
    });
  }

  // IMAGES
  listImages(options?: ListImagesOptions) {
    return this.docker.listImages(options as Dockerode.ListImagesOptions);
  }

  getImage(name: string) {
    return this.docker.getImage(name);
  }

  async pull(repoTag: string, options?: PullImageOptions) {
    const stream = await this.docker.pull(repoTag, options);
    return followProgress(this.docker, stream);
  }

  pruneImages(options?: PruneImagesOptions) {
    return this.docker.pruneImages(options);
  }

  // CONTAINERS
  async listContainers(options?: ListContainersOptions) {
    return new Promise<ContainerInspectInfo[]>(async (resolve, reject) => {
      const containerInfos = await this.docker.listContainers(options as ContainerListOptions);
      const containerInspectInfos = await Promise.all(
        containerInfos.map(async (containerInfo) => {
          const container = this.getContainer(containerInfo.Id);
          return await container.inspect();
        })
      );

      resolve(containerInspectInfos);
    });
  }

  getContainer(id: string) {
    return this.docker.getContainer(id);
  }

  async runContainer(image: string, { name, Volumes, ExposedPorts, HostConfig }: ContainerCreateOptions = {}) {
    const cmd = [];
    const container = await this.docker.createContainer({ Image: image, Tty: false, Cmd: cmd, name, Volumes, ExposedPorts, HostConfig });
    await container.start({});
    return container;
  }

  createContainer(options: ContainerCreateOptions) {
    return this.docker.createContainer(options);
  }

  pruneContainers(options?: PruneContainersOptions) {
    return this.docker.pruneContainers(options);
  }

  async renameContainer(id: string, name: string) {
    const container = this.getContainer(id);
    const { Name: oldName } = await container.inspect();
    await container.rename({ name });
    return { oldName: oldName.substring(1), newName: name };
  }

  logContainer(id: string) {
    return new Promise<string>((resolve, reject) => {
      const container = this.getContainer(id);
      return container.logs({ stdout: true, stderr: true, timestamps: true }, (error, buffer) => {
        if (error) {
          return reject(error);
        }

        return resolve(
          buffer
            .toString('utf-8')
            .split('\n')
            .map((value) => value.substring(8))
            .join('\n')
        );
      });
    });
  }

  inspectContainer(id: string) {
    const container = this.getContainer(id);
    return container.inspect();
  }

  // VOLUMES
  listVolumes(options?: ListVolumesOptions) {
    return this.docker.listVolumes(options) as Promise<{ Volumes: VolumeInspectInfo[]; Warnings: string[] | null }>;
  }

  getVolume(name: string) {
    return this.docker.getVolume(name);
  }

  async createVolume(options?: VolumeCreateOptions) {
    // TODO this a bug from the type definitions, the return should be Volume.
    const volume = (await this.docker.createVolume(options)) as unknown as Volume;
    return this.getVolume(volume.name);
  }

  pruneVolumes(options?: VolumePruneOptions) {
    return this.docker.pruneVolumes(options);
  }

  // EVENTS
  listEvents() {
    return Promise.resolve(this.events);
  }

  // NETWORKS
  listNetworks() {
    return this.docker.listNetworks();
  }

  getNetwork(id: string) {
    return this.docker.getNetwork(id);
  }

  createNetwork(options: NetworkCreateOptions) {
    return this.docker.createNetwork(options);
  }

  deleteNetwork(id: string) {
    const network = this.getNetwork(id);
    network.remove();
  }

  // SYSTEM
  info() {
    return this.docker.info() as Promise<SystemInfo>;
  }

  version() {
    return this.docker.version();
  }

  ping() {
    return this.docker.ping() as Promise<SystemPing>;
  }

  static fromConfig(gateway: DockerGateway, url?: string) {
    let dockerOptions: DockerOptions = {};
    if (url) {
      dockerOptions = stringMatcher()
        .match(/((?:https:\/\/|http:\/\/|tcp:\/\/|)[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(?::[0-9]+)?)/, ([host, port]) => ({ host, port: parseInt(port) }))
        .match(/unix:(.*)/, ([socketPath]) => ({ socketPath }))
        .query(url);
    }

    return new DockerService(new Docker(dockerOptions), gateway);
  }
}
