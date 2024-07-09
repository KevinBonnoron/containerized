import type { DockerCommand, DockerRunOptions } from '../../types';

import { parseDockerCommand, stringifyDockerCommand } from './docker.utils';

describe('DockerUtils', () => {
  describe('parseDockerCommand', () => {
    const buildDockerRunOptions = (dockerRunOptions: Partial<DockerRunOptions>) => ({
      image: 'alpine',
      tag: 'latest',
      options: {
        ...dockerRunOptions,
      },
    });

    it.each(['docker run alpine', 'docker run alpine:latest'])('should return DockerRunOptions for basic command', (command) => {
      const expected = buildDockerRunOptions({});

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run --cap-add=CAP_IPC_LOCK alpine', addedCapabilities: ['CAP_IPC_LOCK'] satisfies DockerRunOptions['addedCapabilities'] },
      { command: 'docker run --cap-add=CAP_IPC_LOCK --cap-add=CAP_IPC_LOCK alpine', addedCapabilities: ['CAP_IPC_LOCK'] satisfies DockerRunOptions['addedCapabilities'] },
      { command: 'docker run --cap-add=CAP_IPC_LOCK --cap-add=CAP_NET_ADMIN alpine', addedCapabilities: ['CAP_IPC_LOCK', 'CAP_NET_ADMIN'] satisfies DockerRunOptions['addedCapabilities'] },
    ])('should return DockerRunOptions for cap-add command', ({ command, addedCapabilities }) => {
      const expected = buildDockerRunOptions({ addedCapabilities });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run --cap-drop=CAP_IPC_LOCK alpine', droppedCapabilities: ['CAP_IPC_LOCK'] satisfies DockerRunOptions['addedCapabilities'] },
      { command: 'docker run --cap-drop=CAP_IPC_LOCK --cap-drop=CAP_IPC_LOCK alpine', droppedCapabilities: ['CAP_IPC_LOCK'] satisfies DockerRunOptions['addedCapabilities'] },
      { command: 'docker run --cap-drop=CAP_IPC_LOCK --cap-drop=CAP_NET_ADMIN alpine', droppedCapabilities: ['CAP_IPC_LOCK', 'CAP_NET_ADMIN'] satisfies DockerRunOptions['addedCapabilities'] },
    ])('should return DockerRunOptions for cap-drop command', ({ command, droppedCapabilities }) => {
      const expected = buildDockerRunOptions({ droppedCapabilities });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each(['docker run -d alpine', 'docker run --detached alpine'])('should return DockerRunOptions for detached command', (command) => {
      const expected = buildDockerRunOptions({ detached: true });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([{ command: 'docker run -e PUID=1000 -e PGID=1000 alpine', environments: { PUID: '1000', PGID: '1000' } }])('should return DockerRunOptions for env command', ({ command, environments }) => {
      const expected = buildDockerRunOptions({ environments });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run -l test.label=john alpine', labels: { 'test.label': 'john' } },
      { command: 'docker run -l test.label=john -l test.label=john2 alpine', labels: { 'test.label': 'john2' } },
      { command: 'docker run --label test.label=doe alpine', labels: { 'test.label': 'doe' } },
      { command: 'docker run --label test.label=doe --label test.label=doe2 alpine', labels: { 'test.label': 'doe2' } },
    ])('should return DockerRunOptions for label command', ({ command, labels }) => {
      const expected = buildDockerRunOptions({ labels });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run --name web alpine', name: 'web' },
      { command: 'docker run --name=web alpine', name: 'web' },
    ])('should return DockerRunOptions for name command', ({ command, name }) => {
      const expected = buildDockerRunOptions({ name });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run --net host alpine', network: 'host' },
      { command: 'docker run --net=host alpine', network: 'host' },
    ])('should return DockerRunOptions for network command', ({ command, network }) => {
      const expected = buildDockerRunOptions({ network });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([{ command: 'docker run --privileged alpine', privileged: true }])('should return DockerRunOptions for command with privileged mode', ({ command, privileged }) => {
      const expected = buildDockerRunOptions({ privileged });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run -p 80:80 alpine', publish: [{ protocol: 'tcp', host: 80, container: 80 }] },
      {
        command: 'docker run -p 8080:80 -p 443:443/udp alpine',
        publish: [
          { protocol: 'tcp', host: 8080, container: 80 },
          { protocol: 'udp', host: 443, container: 443 },
        ],
      },
      {
        command: 'docker run -p 10.0.0.1:8080:80 -p 443:443/udp alpine',
        publish: [
          { protocol: 'tcp', ip: '10.0.0.1', host: 8080, container: 80 },
          { protocol: 'udp', host: 443, container: 443 },
        ],
      },
      { command: 'docker run --publish 80:80 alpine', publish: [{ protocol: 'tcp', host: 80, container: 80 }] },
      {
        command: 'docker run --publish 10.0.0.1:8080:80 --publish 443:443/udp alpine',
        publish: [
          { protocol: 'tcp', ip: '10.0.0.1', host: 8080, container: 80 },
          { protocol: 'udp', host: 443, container: 443 },
        ],
      },
    ])('should return DockerRunOptions for command with publish', ({ command, publish }: { command: string; publish: DockerRunOptions['publish'] }) => {
      const expected = buildDockerRunOptions({ publish });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run --restart=no alpine', restartPolicy: { mode: 'no' } },
      { command: 'docker run --restart=on-failure alpine', restartPolicy: { mode: 'on-failure' } },
      { command: 'docker run --restart=on-failure:5 alpine', restartPolicy: { mode: 'on-failure', count: 5 } },
      { command: 'docker run --restart=always alpine', restartPolicy: { mode: 'always' } },
      { command: 'docker run --restart=unless-stopped alpine', restartPolicy: { mode: 'unless-stopped' } },
    ])('should return DockerRunOptions for command with restart', ({ command, restartPolicy }) => {
      const expected = buildDockerRunOptions({ restartPolicy });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([{ command: 'docker run --rm alpine', remove: true }])('should return DockerRunOptions for command with remove', ({ command, remove }) => {
      const expected = buildDockerRunOptions({ remove });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([{ command: 'docker run --security-opt seccomp=/path/to/seccomp/profile.json alpine', securityOptions: { seccomp: '/path/to/seccomp/profile.json' } }])('should return DockerRunOptions for command with security-opt', ({ command, securityOptions }) => {
      const expected = buildDockerRunOptions({ securityOptions });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([{ command: 'docker run --shm-size="1gb" alpine', shmSize: '1gb' }])('should return DockerRunOptions for command with shm-size', ({ command, shmSize }) => {
      const expected = buildDockerRunOptions({ shmSize });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });

    it.each([
      { command: 'docker run -v /etc/hosts:/etc/hosts alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts' }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v /etc/hosts:/etc/hosts:ro alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['ro'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v /etc/hosts:/etc/hosts:ro,z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['ro', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v /etc/hosts:/etc/hosts:ro,Z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['ro', 'Z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v /etc/hosts:/etc/hosts:rw alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['rw'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v /etc/hosts:/etc/hosts:rw,z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['rw', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v /etc/hosts:/etc/hosts:rw,Z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['rw', 'Z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v data:/etc/hosts alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts' }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v data:/etc/hosts:ro alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['ro'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v data:/etc/hosts:ro,z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['ro', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v data:/etc/hosts:ro,Z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['ro', 'Z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v data:/etc/hosts:rw alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['rw'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v data:/etc/hosts:rw,z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['rw', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run -v data:/etc/hosts:rw,Z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['rw', 'Z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume /etc/hosts:/etc/hosts alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts' }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume /etc/hosts:/etc/hosts:ro alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['ro'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume /etc/hosts:/etc/hosts:ro,z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['ro', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume /etc/hosts:/etc/hosts:ro,Z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['ro', 'Z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume /etc/hosts:/etc/hosts:rw alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['rw'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume /etc/hosts:/etc/hosts:rw,z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['rw', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume /etc/hosts:/etc/hosts:rw,Z alpine', volumes: [{ type: 'bind', host: '/etc/hosts', container: '/etc/hosts', options: ['rw', 'Z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts' }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts:ro alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['ro'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts:ro,z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['ro', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts:ro,Z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['ro', 'Z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts:ro alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['ro'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts:rw alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['rw'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts:rw,z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['rw', 'z'] }] satisfies DockerRunOptions['volumes'] },
      { command: 'docker run --volume data:/etc/hosts:rw,Z alpine', volumes: [{ type: 'named', host: 'data', container: '/etc/hosts', options: ['rw', 'Z'] }] satisfies DockerRunOptions['volumes'] },
    ])('should return DockerRunOptions for command with volume binding', ({ command, volumes }: { command: string; volumes: DockerRunOptions['volumes'] }) => {
      const expected = buildDockerRunOptions({ volumes });

      expect(parseDockerCommand(command)).toStrictEqual(expected);
    });
  });

  describe('stringifyDockerCommand', () => {
    it('should return string for basic DockerCommand', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {},
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run alpine:latest');
    });

    it('should return string for DockerCommand with detached', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          detached: true,
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run -d alpine:latest');
    });

    it('should return string for DockerCommand with name', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          name: 'web',
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run --name=web alpine:latest');
    });

    it('should return string for DockerCommand with network', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          network: 'host',
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run --net=host alpine:latest');
    });

    it('should return string for DockerCommand with privileged', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          privileged: true,
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run --privileged alpine:latest');
    });

    it('should return string for DockerCommand with remove', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          remove: true,
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run --rm alpine:latest');
    });

    it('should return string for DockerCommand with volumes', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          volumes: [{ host: '/etc/hosts', container: '/etc/hosts', type: 'bind' }],
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run -v /etc/hosts:/etc/hosts alpine:latest');
    });

    it('should return string for DockerCommand with environments', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          environments: {
            GUID: '1000',
          },
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run -e GUID=1000 alpine:latest');
    });

    it('should return string for DockerCommand with publish', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          publish: [
            { protocol: 'tcp', host: 12, container: 34 },
            { protocol: 'udp', host: 56, container: 78 },
            { protocol: 'tcp', container: 90 },
            { protocol: 'tcp', ip: '10.0.0.1', host: 100, container: 100 },
          ],
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run -p 12:34 -p 56:78/udp -p 90 -p 10.0.0.1:100:100 alpine:latest');
    });

    it('should return string for DockerCommand with labels', () => {
      const dockerRunCommand: DockerCommand = {
        type: 'run',
        image: 'alpine',
        tag: 'latest',
        options: {
          labels: {
            maintainer: 'KevinBonnoron',
          },
        },
      };

      expect(stringifyDockerCommand(dockerRunCommand)).toStrictEqual('docker run -l maintainer=KevinBonnoron alpine:latest');
    });
  });
});
