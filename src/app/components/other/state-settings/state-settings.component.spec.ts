import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSettingsComponent } from './state-settings.component';

describe('StateSettingsComponent', () => {
  let component: StateSettingsComponent;
  let fixture: ComponentFixture<StateSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
