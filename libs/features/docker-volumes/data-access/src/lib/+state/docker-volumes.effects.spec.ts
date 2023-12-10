
import { MockService } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { DockerVolumesService } from '../services';

import { DockerVolumesActions } from './docker-volumes.actions';
import { DockerVolumesEffects } from './docker-volumes.effects';
import { DockerVolumesEntity } from './docker-volumes.models';

describe('DockerVolumesEffects', () => {
  describe('load$', () => {
    it('should trigger loadSuccess', (done) => {
      const dockerVolumes: DockerVolumesEntity[] = [{
        name: 'f27938e8ca46cfc5d897f175c710112962298b44ace14693faa6a42f57780a52',
        labels: { 'com.docker.volume.anonymous': '' },
        driver: 'local',
        mountPoint: '/var/lib/docker/volumes/f27938e8ca46cfc5d897f175c710112962298b44ace14693faa6a42f57780a52/_data',
        scope: 'local'
      }];

      const actionMock$ = of(DockerVolumesActions.load());
      const dockerContainersServiceMock = MockService(DockerVolumesService, {
        loadAll: () => of(dockerVolumes)
      });

      DockerVolumesEffects.load$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerVolumesActions.loadSuccess({ dockerVolumes }));
        done();
      });
    });

    it('should trigger loadFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const actionMock$ = of(DockerVolumesActions.load());
      const dockerContainersServiceMock = MockService(DockerVolumesService, {
        loadAll: () => throwError(() => error)
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerVolumesEffects.load$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerVolumesActions.loadFailure({ error }));
        done();
      });
    });
  });
});

