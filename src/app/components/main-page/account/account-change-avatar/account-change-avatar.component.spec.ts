import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangeAvatarComponent } from './account-change-avatar.component';

describe('AccountChangeAvatarComponent', () => {
  let component: AccountChangeAvatarComponent;
  let fixture: ComponentFixture<AccountChangeAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountChangeAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChangeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
