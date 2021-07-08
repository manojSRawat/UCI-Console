import {TelemetryUtilsService} from './telemetry-utils.service';
import {ElementsModule} from './elements/elements.module';
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
        UciRoutingModule,
        ElementsModule
    ],
    exports: [
        LibEntryComponent,
        ComponentsModule
    ],
    providers: [UciEventsService, TelemetryUtilsService, {provide: 'CsModule', useFactory: provideCsModule}]
})
export class UciModule {
}
