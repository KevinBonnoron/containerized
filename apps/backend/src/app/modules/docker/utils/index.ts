import { isArray } from 'class-validator';
import type Docker from 'dockerode';

export async function followProgress(docker: Docker, stream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    docker.modem.followProgress(stream, (error, value) => error ? reject(error) : resolve(value));
  });
}

export const transformToArray = ({ value }: { value: string }) => isArray(value) ? value : value.split(',');

