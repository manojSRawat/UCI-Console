import {LibEntryComponent} from '../components/lib-entry/lib-entry.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ConversationListComponent} from '../components/conversation-list/conversation-list.component';
import {ConversationAddComponent} from '../components/conversation-add/conversation-add.component';
import {UserSegmentListComponent} from '../components/user-segment-list/user-segment-list.component';
import {AddSegmentComponent} from '../components/add-segment/add-segment.component';


const routes: Routes = [
    {
        path: '',
        component: LibEntryComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ConversationListComponent
            },
            {
                path: 'add',
                pathMatch: 'full',
                component: ConversationAddComponent,
            },
            {
                path: 'user-segment',
                pathMatch: 'full',
                component: UserSegmentListComponent,
            },
            {
                path: 'add-segment',
                pathMatch: 'full',
                component: AddSegmentComponent,
            }
        ]
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
export class UciRoutingModule {
}
