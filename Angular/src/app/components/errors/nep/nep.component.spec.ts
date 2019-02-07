import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NEPComponent } from './nep.component';

describe('NEPComponent', () => {
  let component: NEPComponent;
  let fixture: ComponentFixture<NEPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NEPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NEPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
