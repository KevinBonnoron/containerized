import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureEnvironmentUiComponent } from './feature-environment-ui.component';

describe('FeatureEnvironmentUiComponent', () => {
  let component: FeatureEnvironmentUiComponent;
  let fixture: ComponentFixture<FeatureEnvironmentUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureEnvironmentUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureEnvironmentUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
