import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationSuccessComponent } from './conversation-success.component';

describe('ConversationSuccessComponent', () => {
  let component: ConversationSuccessComponent;
  let fixture: ComponentFixture<ConversationSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
