import {TelemetryUtilsService} from './telemetry-utils.service';
import {LibEntryComponent} from './components/lib-entry/lib-entry.component';
import {ComponentsModule} from './components/components.module';
import {UciRoutingModule} from './uci-routing/uci-routing.module';

import {NgModule} from '@angular/core';

import {UciEventsService} from './uci-events.service';
import {ToasterService} from './services/toaster.service';
import {AddLogicComponent} from './components/add-logic/add-logic.component';

export function provideCsModule() {
    return window['CsModule'];
}

@NgModule({
    declarations: [
        LibEntryComponent
    ],
    imports: [
        ComponentsModule,
        UciRoutingModule,
        AddLogicComponent,
    ],
    exports: [
        LibEntryComponent
    ],
    providers: [UciEventsService, TelemetryUtilsService, ToasterService, {provide: 'CsModule', useFactory: provideCsModule}]
})
export class UciModule {
}
