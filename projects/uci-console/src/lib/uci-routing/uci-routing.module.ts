import { ConversationAllComponent } from '../components/conversations/conversation-all.component';
import { LibEntryComponent } from '../components/lib-entry/lib-entry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ConversationListComponent} from '../components/conversation-list/conversation-list.component';
import {ConversationAddComponent} from '../components/conversation-add/conversation-add.component';
import {UserSegmentListComponent} from '../components/user-segment-list/user-segment-list.component';


const routes: Routes = [
  {
    path: '',
    component: UserSegmentListComponent,
    /*children: [
      {
        path: 'conversations',
        pathMatch: 'full',
        component: ConversationAllComponent
      }
    ]*/
  },
  {
    path: 'uci-add',
    component: ConversationAddComponent,
  },
  {
    path: 'user-segment',
    component: UserSegmentListComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class UciRoutingModule { }
