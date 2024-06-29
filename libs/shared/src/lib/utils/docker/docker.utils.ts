import type { DockerCommand, DockerRunCommand, DockerRunOptions } from '../../types';
import { objectTokenizer } from '../object-tokenizer/object-tokenizer';
import { stringMatcher } from '../string-matcher/string-matcher';

// PARSE
export const parseDockerRunOptions = (optionString: string): DockerRunOptions => {
  const dockerRunOptions: Partial<DockerRunOptions> = {};

  const matcher = stringMatcher()
    .match(/(?:--cap-add)[= ]+([\w]+)/, ([capability]) => dockerRunOptions.addedCapabilities = [...new Set([...dockerRunOptions.addedCapabilities ?? [], capability])])
    .match(/(?:--cap-drop)[= ]+([\w]+)/, ([capability]) => dockerRunOptions.droppedCapabilities = [...new Set([...dockerRunOptions.droppedCapabilities ?? [], capability])])
    .match(/(?:--detached|-d )/, () => dockerRunOptions.detached = true)
    .match(/(?:--device) ([(^:|\S)]+):([\S]+)/, ([source, target]) => dockerRunOptions.devices = [...dockerRunOptions.devices ?? [], { source, target }])
    .match(/(?:--env|-e) ([\w]+)=([\S]+)?/, ([key, value = '']) => dockerRunOptions.environments = { ...dockerRunOptions.environments ?? {}, [key]: value })
    .match(/(?:--label|-l) ([\w.]+)=([\w]+)/, ([key, value]) => dockerRunOptions.labels = { ...dockerRunOptions.labels ?? {}, [key]: value })
    .match(/(?:--name)[= ]+([\S]+)/, ([name]) => dockerRunOptions.name = name)
    .match(/(?:--net)[= ]+([\w\d]+)/, ([network]) => dockerRunOptions.network = network)
    .match(/(?:--privileged)/, () => dockerRunOptions.privileged = true)
    .match(/(?:--publish|-p) (?:([\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}):)?([\d]+):([\d]+)(?:\/(tcp|udp))?/, ([ip, host, container, protocol = 'tcp']) => dockerRunOptions.publish = [...dockerRunOptions.publish ?? [], { protocol, ...(ip && { ip }), host: parseInt(host), container: parseInt(container) }])
    // TODO modify regex to only allow count with on-failure (eg: on-failure:5)
    .match(/(?:--restart[= ]+(no|on-failure|always|unless-stopped)(?::(\d))?)/, ([mode, count]) => dockerRunOptions.restartPolicy = { mode, ...(count ? { count: parseInt(count) } : {}) })
    .match(/(?:--rm)/, () => dockerRunOptions.remove = true)
    .match(/(?:--security-opt) ([\w]+)=([\S]+)/, ([key, value]) => dockerRunOptions.securityOptions = { ...dockerRunOptions.securityOptions ?? {}, [key]: value })
    .match(/(?:--shm-size)[= ]+"([\w\d]+)"/, ([size]) => dockerRunOptions.shmSize = size)
    .match(/(?:--volume|-v) ([^\r\n\t\f\v: ]+):([^\r\n\t\f\v: ]+)(?::([(rw|ro|z|Z),]+))?/, ([host, container, options]) => dockerRunOptions.volumes = [...dockerRunOptions.volumes ?? [], { type: /[/.]/.test(host) ? 'bind' : 'named', host, container, ...(options ? { options: options.replace(' ', '').split(',') } : {}) }])
    .match(/ /)
    ;

  matcher.exec(optionString);
  return dockerRunOptions as DockerRunOptions;
}

export const parseDockerCommand = (dockerCommand: string): DockerCommand => {
  const matcher = stringMatcher()
    .match(/docker run ((?:-\w|--[\w-]+){1}(?:(?:[ ]+|=){1}(?:[\S ]+))? )*([.\w/-]+)(?::([\w]+))?$/, ([options = '', image, tag = 'latest']) => ({ image, tag, options: parseDockerRunOptions(options) }))
    .match(/.*/, (dockerCommand) => {
      throw new Error(`Invalid regex for command [${dockerCommand}]`);
    });

  return matcher.query(dockerCommand);
};

// STRINGIFY
export const stringifyDockerRunOptions = (dockerRunCommandOptions: DockerRunCommand['options']) => {
  const tokenizer = objectTokenizer<DockerRunCommand['options']>()
    .token('detached', () => '-d')
    .token('name', (name) => `--name=${name}`)
    .token('network', (net) => `--net=${net}`)
    .token('remove', () => '--rm')
    .token('privileged', () => '--privileged')
    .token('volumes', (volumes) => volumes.map((volume) => `-v ${volume.host}:${volume.container}`).join(' '))
    .token('environments', (environments) => Object.entries(environments).map(([key, value]) => `-e ${key}=${value}`).join(' '))
    .token('publish', (publish) => publish.map(({ protocol, ip, host, container }) => `-p ${ip ? `${ip}:` : ''}${host ? `${host}:` : ''}${container}${ protocol === 'udp' ? '/udp' : '' }`).join(' '))
    .token('labels', (labels) => Object.entries(labels).map(([key, value]) => `-l ${key}=${value}`).join(' '))
  ;

  return tokenizer.exec(dockerRunCommandOptions).concat('').join(' ');
}

export const stringifyDockerCommand = (dockerCommand: DockerCommand) => {
  let command;

  switch (dockerCommand.type) {
    case 'run': {
      command = `docker run ${stringifyDockerRunOptions(dockerCommand.options)}${dockerCommand.image}:${dockerCommand.tag}`;
      break;
    }
  }

  return command;
}
