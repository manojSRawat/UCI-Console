import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSegmentListComponent } from './user-segment-list.component';

describe('UserSegmentListComponent', () => {
  let component: UserSegmentListComponent;
  let fixture: ComponentFixture<UserSegmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSegmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSegmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
