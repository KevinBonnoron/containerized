import { MockService } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { DockerContainersService } from '../services';

import { DockerContainersActions } from './docker-containers.actions';
import { DockerContainersEffects } from './docker-containers.effects';
import { DockerContainersEntity } from './docker-containers.models';

describe('DockerContainersEffects', () => {
  describe('load$', () => {
    it('should trigger loadSuccess', (done) => {
      const dockerContainers: DockerContainersEntity[] = [{
        id: 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440',
        names: ['hungry_keller'],
        image: 'alpine',
        created: new Date('2023-12-11T18:49:08.000Z'),
        status: 'created',
        ports: []
      }];

      const actionMock$ = of(DockerContainersActions.load());
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        loadAll: jest.fn().mockReturnValue(of(dockerContainers))
      });

      DockerContainersEffects.load$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.loadSuccess({ dockerContainers }));
        expect(dockerContainersServiceMock.loadAll).toHaveBeenCalledWith();
        done();
      });
    });

    it('should trigger loadFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const actionMock$ = of(DockerContainersActions.load());
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        loadAll: jest.fn().mockReturnValue(throwError(() => error))
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerContainersEffects.load$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.loadFailure({ error }));
        expect(dockerContainersServiceMock.loadAll).toHaveBeenCalledWith();
        done();
      });
    });
  });

  describe('create$', () => {
    it('should trigger createSuccess', (done) => {
      const dockerContainer: DockerContainersEntity = {
        id: 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440',
        names: ['hungry_keller'],
        image: 'alpine',
        created: new Date('2023-12-11T18:49:08.000Z'),
        status: 'created',
        ports: []
      };

      const actionMock$ = of(DockerContainersActions.create({ dockerContainer: { image: 'nginx', names: [], ports: [] } }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        create: jest.fn().mockReturnValue(of(dockerContainer))
      });

      DockerContainersEffects.create$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.createSuccess({ dockerContainer }));
        expect(dockerContainersServiceMock.create).toHaveBeenCalledWith({ image: 'nginx', names: [], ports: [] });
        done();
      });
    });

    it('should trigger createFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const actionMock$ = of(DockerContainersActions.create({ dockerContainer: { image: 'nginx', names: [], ports: [] } }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        create: jest.fn().mockReturnValue(throwError(() => error))
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerContainersEffects.create$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.createFailure({ error }));
        expect(dockerContainersServiceMock.create).toHaveBeenCalledWith({ image: 'nginx', names: [], ports: [] });
        done();
      });
    });
  });

  describe('start$', () => {
    it('should trigger startSuccess', (done) => {
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';
      const actionMock$ = of(DockerContainersActions.start({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        start: jest.fn().mockReturnValue(of(undefined))
      });

      DockerContainersEffects.start$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.startSuccess({ id }));
        expect(dockerContainersServiceMock.start).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should trigger startFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';
      const actionMock$ = of(DockerContainersActions.start({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        start: jest.fn().mockReturnValue(throwError(() => error))
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerContainersEffects.start$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.startFailure({ error }));
        expect(dockerContainersServiceMock.start).toHaveBeenCalledWith(id);
        done();
      });
    });
  });

  describe('restart$', () => {
    it('should trigger restartSuccess', (done) => {
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';
      const actionMock$ = of(DockerContainersActions.restart({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        start: jest.fn().mockReturnValue(of(undefined)),
        stop: jest.fn().mockReturnValue(of(undefined))
      });

      DockerContainersEffects.restart$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.restartSuccess({ id }));
        expect(dockerContainersServiceMock.stop).toHaveBeenCalledWith(id);
        expect(dockerContainersServiceMock.start).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should trigger restartFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';
      const actionMock$ = of(DockerContainersActions.restart({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        stop: jest.fn().mockReturnValue(throwError(() => error)),
        start: jest.fn().mockReturnValue(of(undefined)),
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerContainersEffects.restart$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.restartFailure({ error }));
        expect(dockerContainersServiceMock.stop).toHaveBeenCalledWith(id);
        expect(dockerContainersServiceMock.start).not.toHaveBeenCalled();
        done();
      });
    });

    it('should trigger restartFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';
      const actionMock$ = of(DockerContainersActions.restart({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        stop: jest.fn().mockReturnValue(of(undefined)),
        start: jest.fn().mockReturnValue(throwError(() => error)),
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerContainersEffects.restart$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.restartFailure({ error }));
        expect(dockerContainersServiceMock.start).toHaveBeenCalledWith(id);
        expect(dockerContainersServiceMock.stop).toHaveBeenCalledWith(id);
        done();
      });
    });
  });

  describe('stop$', () => {
    it('should trigger stopSuccess', (done) => {
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';
      const actionMock$ = of(DockerContainersActions.stop({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        stop: jest.fn().mockReturnValue(of(undefined))
      });

      DockerContainersEffects.stop$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.stopSuccess({ id }));
        expect(dockerContainersServiceMock.stop).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should trigger stopFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';
      const actionMock$ = of(DockerContainersActions.stop({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        stop: jest.fn().mockReturnValue(throwError(() => error))
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerContainersEffects.stop$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.stopFailure({ error }));
        expect(dockerContainersServiceMock.stop).toHaveBeenCalledWith(id);
        done();
      });
    });
  });

  describe('delete$', () => {
    it('should trigger deleteSuccess', (done) => {
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';

      const actionMock$ = of(DockerContainersActions.delete({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        delete: jest.fn().mockReturnValue(of(id))
      });

      DockerContainersEffects.delete$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.deleteSuccess({ id }));
        expect(dockerContainersServiceMock.delete).toHaveBeenCalledWith(id);
        done();
      });
    });

    it('should trigger deleteFailure', (done) => {
      const error = new Error(`Okay, Houston, I believe we've had a problem here`);
      const id = 'dc6eaf0b618fa9c97480db55043688ca29f9f44edb6752a2a8b19ca68ea3b440';

      const actionMock$ = of(DockerContainersActions.delete({ id }));
      const dockerContainersServiceMock = MockService(DockerContainersService, {
        delete: jest.fn().mockReturnValue(throwError(() => error))
      });

      jest.spyOn(console, 'error').mockImplementation(() => { });

      DockerContainersEffects.delete$(actionMock$, dockerContainersServiceMock).subscribe((action) => {
        expect(action).toEqual(DockerContainersActions.deleteFailure({ error }));
        expect(dockerContainersServiceMock.delete).toHaveBeenCalledWith(id);
        done();
      });
    });
  });
});
