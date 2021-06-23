import { PipesModule } from './../pipes/pipes.module';
import { UciService } from '../services/uci.service';
import { ConfigService } from './../services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { ElementsModule } from './../elements/elements.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ConversationAllComponent } from './conversations/conversation-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationAddComponent } from './conversation-add/conversation-add.component';
@NgModule({
  declarations: [
    SidePanelComponent,
    ConversationAllComponent,
    ConversationListComponent,
    ConversationAddComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ElementsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    PipesModule,
    InfiniteScrollModule
  ],
  exports: [
    SidePanelComponent,
    ConversationAllComponent   
  ],
  providers: [
    UciService, ConfigService
  ]
})
export class ComponentsModule { }
