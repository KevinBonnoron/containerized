import { MockService } from 'ng-mocks';
import { of } from 'rxjs';

import { DockerImagesService } from '../services';

import { DockerImagesActions } from './docker-images.actions';
import { DockerImagesEffects } from './docker-images.effects';
import { DockerImagesEntity } from './docker-images.models';

describe('DockerImagesEffects', () => {
  describe('load$', () => {
    it('should trigger loadSuccess', (done) => {
      const dockerImages: DockerImagesEntity[] = [
        { id: '1', labels: {}, tags: ['nginx:latest'] }
      ];

      const actionMock$ = of(DockerImagesActions.load());
      const dockerImagesServiceMock = MockService(DockerImagesService, {
        loadAll: () => of(dockerImages)
      });

      DockerImagesEffects.load$(actionMock$, dockerImagesServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerImagesActions.loadSuccess({ dockerImages }));
        done();
      });
    });
  });
});
