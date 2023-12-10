import Docker from 'dockerode';

export async function followProgress(docker: Docker, stream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    docker.modem.followProgress(stream, (error, value) => error ? reject(error) : resolve(value));
  });
}
