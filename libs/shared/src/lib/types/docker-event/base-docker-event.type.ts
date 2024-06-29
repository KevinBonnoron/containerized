export interface BaseDockerEvent<T> {
  scope: 'local' | 'global';
  time: number;
  timeNano: number;
  Type: T;
}
