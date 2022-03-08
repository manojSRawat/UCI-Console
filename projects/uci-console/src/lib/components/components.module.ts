import {PipesModule} from '../pipes/pipes.module';
import {UciService} from '../services/uci.service';
import {ConfigService} from '../services/config.service';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidePanelComponent} from './side-panel/side-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConversationListComponent} from './conversation-list/conversation-list.component';
import {ConversationAddComponent} from './conversation-add/conversation-add.component';
import {UserSegmentListComponent} from './user-segment-list/user-segment-list.component';
import {CommonFormElementsModule} from 'common-form-elements-v9';
import {UserSegmentAddComponent} from './user-segment-add/user-segment-add.component';
import {SuiModule} from 'ng2-semantic-ui-v9';
import {ConversationSuccessComponent} from './conversation-success/conversation-success.component';
import {UciGraphQlService} from '../services/uci-graph-ql.service';
import {TermsConditionsComponent} from './terms-conditions/terms-conditions.component';
import {TermsConditionConfirmComponent} from './terms-condition-confirm/terms-condition-confirm.component';
import {AddLogicComponent} from './add-logic/add-logic.component';
//material-ui
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {LogicListComponent} from './logic-list/logic-list.component';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
    declarations: [
        SidePanelComponent,
        ConversationListComponent,
        ConversationAddComponent,
        UserSegmentListComponent,
        UserSegmentAddComponent,
        TermsConditionsComponent,
        TermsConditionConfirmComponent,
        ConversationSuccessComponent,
        AddLogicComponent,
        LogicListComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
        PipesModule,
        InfiniteScrollModule,
        CommonFormElementsModule,
        SuiModule,
        MatButtonModule,
        MatInputModule,
        MatGridListModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule
    ],
    exports: [
        SidePanelComponent,
    ],
    providers: [
        UciService,
        ConfigService,
        UciGraphQlService,
        MatDatepickerModule
    ],
    entryComponents: [
        AddLogicComponent,
        TermsConditionsComponent,
        TermsConditionConfirmComponent
    ],
})
export class ComponentsModule {
}
