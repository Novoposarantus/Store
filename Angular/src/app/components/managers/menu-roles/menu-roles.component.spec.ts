import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRolesComponent } from './menu-roles.component';

describe('MenuRolesComponent', () => {
  let component: MenuRolesComponent;
  let fixture: ComponentFixture<MenuRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
