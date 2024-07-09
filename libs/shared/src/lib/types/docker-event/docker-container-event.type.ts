import { BaseDockerEvent } from './base-docker-event.type';

// export type DockerContainerAction = 'attach' | 'commit' | 'copy' | 'create' | 'destroy' | 'detach' | 'die' | 'exec_create' | 'exec_detach' | 'exec_start' | 'exec_die' | 'export' | 'health_status' | 'kill' | 'oom' | 'pause' | 'rename' | 'resize' | 'restart' | 'start' | 'stop' | 'top' | 'unpause' | 'update';
interface DockerContainerBaseEvent<A> extends BaseDockerEvent<'container'> {
  status: A;
  Action: A;
}

interface DockerContainerCreateEvent extends DockerContainerBaseEvent<'create'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      image: string;
      name: string;
    };
  };
}

interface DockerContainerStartEvent extends DockerContainerBaseEvent<'start'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      image: string;
      name: string;
    };
  };
}

interface DockerContainerPruneEvent extends DockerContainerBaseEvent<'prune'> {
  Actor: {
    ID: string;
    Attributes: {
      reclaimed: string;
    };
  };
}

interface DockerContainerDestroyEvent extends DockerContainerBaseEvent<'destroy'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      image: string;
      name: string;
    };
  };
}

interface DockerContainerAttachEvent extends DockerContainerBaseEvent<'attach'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      image: string;
      name: string;
    };
  };
}

interface DockerContainerDieEvent extends DockerContainerBaseEvent<'die'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      execDuration: string;
      exitCode: string;
      image: string;
      name: string;
    };
  };
}

interface DockerContainerKillEvent extends DockerContainerBaseEvent<'kill'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      image: string;
      name: string;
      signal: string;
    };
  };
}

/**
 * TODO strange parsing
 * {
  status: 'exec_start: /home/node/.vscode-server/bin/ea1445cc7016315d0f5728f8e8b12a45dc0a7286/node -e \n' +
    "\t\t\t\tconst net = require('net');\n" +
    "\t\t\t\tconst fs = require('fs');\n" +
    '\t\t\t\tprocess.stdin.pause();\n' +
    "\t\t\t\tconst client = net.createConnection({ host: '127.0.0.1', port: 40003 }, () => {\n" +
    "\t\t\t\t\tconsole.error('Connection established');\n" +
    '\t\t\t\t\tclient.pipe(process.stdout);\n' +
    '\t\t\t\t\tprocess.stdin.pipe(client);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote close with error' : 'Remote close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('error', function (err) {\n" +
    '\t\t\t\t\tprocess.stderr.write(err && (err.stack || err.message) || String(err));\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.stdin.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote stdin close with error' : 'Remote stdin close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.on('uncaughtException', function (err) {\n" +
    '\t\t\t\t\tfs.writeSync(process.stderr.fd, `Uncaught Exception: ${String(err && (err.stack || err.message) || err)}\\n`);\n' +
    '\t\t\t\t});\n' +
    '\t\t\t',
  id: '62a5f9ac40b04b2d1ce245614d9e3dfc3129ceaa3b3da182a548f51781f47e5b',
  from: 'vsc-containerized-63d4e2792754f6ce54223f48ae04d81e60dce8a3534bf413a6b284a3d6380dcd-features-uid',
  Type: 'container',
  Action: 'exec_start: /home/node/.vscode-server/bin/ea1445cc7016315d0f5728f8e8b12a45dc0a7286/node -e \n' +
    "\t\t\t\tconst net = require('net');\n" +
    "\t\t\t\tconst fs = require('fs');\n" +
    '\t\t\t\tprocess.stdin.pause();\n' +
    "\t\t\t\tconst client = net.createConnection({ host: '127.0.0.1', port: 40003 }, () => {\n" +
    "\t\t\t\t\tconsole.error('Connection established');\n" +
    '\t\t\t\t\tclient.pipe(process.stdout);\n' +
    '\t\t\t\t\tprocess.stdin.pipe(client);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote close with error' : 'Remote close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('error', function (err) {\n" +
    '\t\t\t\t\tprocess.stderr.write(err && (err.stack || err.message) || String(err));\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.stdin.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote stdin close with error' : 'Remote stdin close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.on('uncaughtException', function (err) {\n" +
    '\t\t\t\t\tfs.writeSync(process.stderr.fd, `Uncaught Exception: ${String(err && (err.stack || err.message) || err)}\\n`);\n' +
    '\t\t\t\t});\n' +
    '\t\t\t',
  Actor: {
    ID: '62a5f9ac40b04b2d1ce245614d9e3dfc3129ceaa3b3da182a548f51781f47e5b',
    Attributes: {
      'dev.containers.id': 'typescript-node',
      'dev.containers.release': 'v0.3.39',
      'dev.containers.source': 'https://github.com/devcontainers/images',
      'dev.containers.timestamp': 'Thu, 30 May 2024 20:21:37 GMT',
      'dev.containers.variant': '22-bookworm',
      'devcontainer.config_file': '/home/kevin/workspaces/personnel/containerized/.devcontainer/devcontainer.json',
      'devcontainer.local_folder': '/home/kevin/workspaces/personnel/containerized',
      'devcontainer.metadata': '[ {"id":"ghcr.io/devcontainers/features/common-utils:2"}, {"id":"ghcr.io/devcontainers/features/git:1"}, {"id":"ghcr.io/devcontainers/features/node:1","customizations":{"vscode":{"extensions":["dbaeumer.vscode-eslint"]}}}, {"customizations":{"vscode":{"extensions":["dbaeumer.vscode-eslint"]}},"remoteUser":"node"}, {"id":"ghcr.io/devcontainers/features/git:1"}, {"customizations":{"vscode":{"extensions":["dbaeumer.vscode-eslint"]}},"remoteUser":"node"}, {"id":"ghcr.io/devcontainers/features/docker-in-docker:2","privileged":true,"entrypoint":"/usr/local/share/docker-init.sh","mounts":[{"source":"dind-var-lib-docker-${devcontainerId}","target":"/var/lib/docker","type":"volume"}],"customizations":{"vscode":{"extensions":["ms-azuretools.vscode-docker"]}}}, {"postCreateCommand":"sudo chown node /data","customizations":{"vscode":{"extensions":["nrwl.angular-console","Angular.ng-template","firsttris.vscode-jest-runner","ms-playwright.playwright","esbenp.prettier-vscode","eamodio.gitlens","bradlc.vscode-tailwindcss","Prisma.prisma"]}},"mounts":[{"source":"containerized_data","target":"/data","type":"volume"},{"source":"/var/run/docker.sock","target":"/var/run/host.docker.sock","type":"bind"}]} ]',
      execID: 'e18d50613be13c8f260f31748914305df13e137921f987df32ab20ffc6fee81b',
      image: 'vsc-containerized-63d4e2792754f6ce54223f48ae04d81e60dce8a3534bf413a6b284a3d6380dcd-features-uid',
      name: 'condescending_kare',
      version: '1.1.1'
    }
  },
  scope: 'local',
  time: 1720449987,
  timeNano: 1720449987081850600
}
 */
interface DockerContainerExecStartEvent extends DockerContainerBaseEvent<'exec_start'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      execID: string;
      image: string;
      name: string;
    };
  };
}

/**
 * TODO strange parsing
 * {
  status: 'exec_create: /home/node/.vscode-server/bin/ea1445cc7016315d0f5728f8e8b12a45dc0a7286/node -e \n' +
    "\t\t\t\tconst net = require('net');\n" +
    "\t\t\t\tconst fs = require('fs');\n" +
    '\t\t\t\tprocess.stdin.pause();\n' +
    "\t\t\t\tconst client = net.createConnection({ host: '127.0.0.1', port: 40003 }, () => {\n" +
    "\t\t\t\t\tconsole.error('Connection established');\n" +
    '\t\t\t\t\tclient.pipe(process.stdout);\n' +
    '\t\t\t\t\tprocess.stdin.pipe(client);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote close with error' : 'Remote close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('error', function (err) {\n" +
    '\t\t\t\t\tprocess.stderr.write(err && (err.stack || err.message) || String(err));\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.stdin.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote stdin close with error' : 'Remote stdin close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.on('uncaughtException', function (err) {\n" +
    '\t\t\t\t\tfs.writeSync(process.stderr.fd, `Uncaught Exception: ${String(err && (err.stack || err.message) || err)}\\n`);\n' +
    '\t\t\t\t});\n' +
    '\t\t\t',
  id: '62a5f9ac40b04b2d1ce245614d9e3dfc3129ceaa3b3da182a548f51781f47e5b',
  from: 'vsc-containerized-63d4e2792754f6ce54223f48ae04d81e60dce8a3534bf413a6b284a3d6380dcd-features-uid',
  Type: 'container',
  Action: 'exec_create: /home/node/.vscode-server/bin/ea1445cc7016315d0f5728f8e8b12a45dc0a7286/node -e \n' +
    "\t\t\t\tconst net = require('net');\n" +
    "\t\t\t\tconst fs = require('fs');\n" +
    '\t\t\t\tprocess.stdin.pause();\n' +
    "\t\t\t\tconst client = net.createConnection({ host: '127.0.0.1', port: 40003 }, () => {\n" +
    "\t\t\t\t\tconsole.error('Connection established');\n" +
    '\t\t\t\t\tclient.pipe(process.stdout);\n' +
    '\t\t\t\t\tprocess.stdin.pipe(client);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote close with error' : 'Remote close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tclient.on('error', function (err) {\n" +
    '\t\t\t\t\tprocess.stderr.write(err && (err.stack || err.message) || String(err));\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.stdin.on('close', function (hadError) {\n" +
    "\t\t\t\t\tconsole.error(hadError ? 'Remote stdin close with error' : 'Remote stdin close');\n" +
    '\t\t\t\t\tprocess.exit(hadError ? 1 : 0);\n' +
    '\t\t\t\t});\n' +
    "\t\t\t\tprocess.on('uncaughtException', function (err) {\n" +
    '\t\t\t\t\tfs.writeSync(process.stderr.fd, `Uncaught Exception: ${String(err && (err.stack || err.message) || err)}\\n`);\n' +
    '\t\t\t\t});\n' +
    '\t\t\t',
  Actor: {
    ID: '62a5f9ac40b04b2d1ce245614d9e3dfc3129ceaa3b3da182a548f51781f47e5b',
    Attributes: {
      'dev.containers.id': 'typescript-node',
      'dev.containers.release': 'v0.3.39',
      'dev.containers.source': 'https://github.com/devcontainers/images',
      'dev.containers.timestamp': 'Thu, 30 May 2024 20:21:37 GMT',
      'dev.containers.variant': '22-bookworm',
      'devcontainer.config_file': '/home/kevin/workspaces/personnel/containerized/.devcontainer/devcontainer.json',
      'devcontainer.local_folder': '/home/kevin/workspaces/personnel/containerized',
      'devcontainer.metadata': '[ {"id":"ghcr.io/devcontainers/features/common-utils:2"}, {"id":"ghcr.io/devcontainers/features/git:1"}, {"id":"ghcr.io/devcontainers/features/node:1","customizations":{"vscode":{"extensions":["dbaeumer.vscode-eslint"]}}}, {"customizations":{"vscode":{"extensions":["dbaeumer.vscode-eslint"]}},"remoteUser":"node"}, {"id":"ghcr.io/devcontainers/features/git:1"}, {"customizations":{"vscode":{"extensions":["dbaeumer.vscode-eslint"]}},"remoteUser":"node"}, {"id":"ghcr.io/devcontainers/features/docker-in-docker:2","privileged":true,"entrypoint":"/usr/local/share/docker-init.sh","mounts":[{"source":"dind-var-lib-docker-${devcontainerId}","target":"/var/lib/docker","type":"volume"}],"customizations":{"vscode":{"extensions":["ms-azuretools.vscode-docker"]}}}, {"postCreateCommand":"sudo chown node /data","customizations":{"vscode":{"extensions":["nrwl.angular-console","Angular.ng-template","firsttris.vscode-jest-runner","ms-playwright.playwright","esbenp.prettier-vscode","eamodio.gitlens","bradlc.vscode-tailwindcss","Prisma.prisma"]}},"mounts":[{"source":"containerized_data","target":"/data","type":"volume"},{"source":"/var/run/docker.sock","target":"/var/run/host.docker.sock","type":"bind"}]} ]',
      execID: 'e18d50613be13c8f260f31748914305df13e137921f987df32ab20ffc6fee81b',
      image: 'vsc-containerized-63d4e2792754f6ce54223f48ae04d81e60dce8a3534bf413a6b284a3d6380dcd-features-uid',
      name: 'condescending_kare',
      version: '1.1.1'
    }
  },
  scope: 'local',
  time: 1720449987,
  timeNano: 1720449987081586000
}
 */
interface DockerContainerExecCreateEvent extends DockerContainerBaseEvent<'exec_create'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      execID: string;
      image: string;
      name: string;
    };
  };
}

interface DockerContainerStopEvent extends DockerContainerBaseEvent<'stop'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      image: string;
      name: string;
    };
  };
}

interface DockerContainerExecDieEvent extends DockerContainerBaseEvent<'exec_die'> {
  id: string;
  from: string;
  Actor: {
    ID: string;
    Attributes: {
      execID: string;
      exitCode: string;
      image: string;
      name: string;
    };
  };
}

export type DockerContainerEvent = DockerContainerPruneEvent | DockerContainerDestroyEvent | DockerContainerCreateEvent | DockerContainerAttachEvent | DockerContainerStartEvent | DockerContainerDieEvent | DockerContainerKillEvent | DockerContainerStopEvent | DockerContainerExecDieEvent;
