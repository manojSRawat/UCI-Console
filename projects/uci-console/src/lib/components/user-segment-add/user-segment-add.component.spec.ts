import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSegmentAddComponent } from './user-segment-add.component';

describe('AddSegmentComponent', () => {
  let component: UserSegmentAddComponent;
  let fixture: ComponentFixture<UserSegmentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSegmentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSegmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
