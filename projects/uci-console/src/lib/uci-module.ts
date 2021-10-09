import {TelemetryUtilsService} from './telemetry-utils.service';
import {LibEntryComponent} from './components/lib-entry/lib-entry.component';
import {ComponentsModule} from './components/components.module';
import {UciRoutingModule} from './uci-routing/uci-routing.module';

import {NgModule} from '@angular/core';

import {UciEventsService} from './uci-events.service';

export function provideCsModule() {
    return window['CsModule'];
}

@NgModule({
    declarations: [
        LibEntryComponent
    ],
    imports: [
        ComponentsModule,
        UciRoutingModule
    ],
    exports: [
        LibEntryComponent
    ],
    providers: [UciEventsService, TelemetryUtilsService, {provide: 'CsModule', useFactory: provideCsModule}]
})
export class UciModule {
}
