import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash-es';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import ConversationListComponent from './conversation-list.component'
import {Router} from '@angular/router';
import {UciService} from '../../services/uci.service';
import {GlobalService} from '../../services/global.service';
import {Helper} from '../../utils/helper';

describe('ConversationListComponent', () => {
  let component: ConversationListComponent;
  let fixture: ComponentFixture<ConversationListComponent>;
  let errorInitiate, de: DebugElement;
  let unitLevelResponse;

  const uciServiceStub = () => {

  }
  const globalServiceStub = () => {

  }
  const routerStub = { url: '/uci-admin' };

  const compState = 'conversationListComponent';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ConversationListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
            { provide: UciService, useValue: uciServiceStub },
            { provide: GlobalService, useValue: globalServiceStub },
            { provide: Router, useValue: routerStub },
            Helper]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationListComponent);
    component = fixture.debugElement.componentInstance;
    de = fixture.debugElement;

    errorInitiate = false;
    unitLevelResponse = false;
    //component.ConversationListComponentInput = ConversationListComponentInput;
    //component.sessionContext = conversationListComponent.sessionContext;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
    it('Component created', () => {
      expect(component).toBeDefined();
    });

});
