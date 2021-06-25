import {PipesModule} from './../pipes/pipes.module';
import {UciService} from '../services/uci.service';
import {ConfigService} from './../services/config.service';
import {HttpClientModule} from '@angular/common/http';
import {ElementsModule} from './../elements/elements.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidePanelComponent} from './side-panel/side-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {TagInputModule} from 'ngx-chips';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConversationListComponent} from './conversation-list/conversation-list.component';
import {ConversationAddComponent} from './conversation-add/conversation-add.component';
import {UserSegmentListComponent} from './user-segment-list/user-segment-list.component';
import {CommonFormElementsModule} from 'common-form-elements';
import {AddSegmentComponent} from './add-segment/add-segment.component';

@NgModule({
    declarations: [
        SidePanelComponent,
        ConversationListComponent,
        ConversationAddComponent,
        UserSegmentListComponent,
        AddSegmentComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ElementsModule,
        FormsModule,
        ReactiveFormsModule,
        // TagInputModule,
        PipesModule,
        InfiniteScrollModule,
        CommonFormElementsModule
    ],
    exports: [
        SidePanelComponent,
    ],
    providers: [
        UciService, ConfigService
    ]
})
export class ComponentsModule {
}
