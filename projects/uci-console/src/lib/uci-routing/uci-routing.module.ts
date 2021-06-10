import { ConversationAllComponent } from '../components/conversations/conversation-all.component';
import { LibEntryComponent } from '../components/lib-entry/lib-entry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LibEntryComponent,
    children: [       
      {
        path: 'conversations',
        pathMatch: 'full',
        component: ConversationAllComponent
      }
    ]
  },
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
