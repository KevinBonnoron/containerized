export interface DockerInfoDto {
  containers: {
    total: number;
    running: number;
    paused: number;
    stopped: number;
  };
  images: number;
  driver: string;
}
