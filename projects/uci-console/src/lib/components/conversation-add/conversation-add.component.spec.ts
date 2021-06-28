import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationAddComponent } from './conversation-add.component';

describe('ConversationAddComponent', () => {
  let component: ConversationAddComponent;
  let fixture: ComponentFixture<ConversationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
