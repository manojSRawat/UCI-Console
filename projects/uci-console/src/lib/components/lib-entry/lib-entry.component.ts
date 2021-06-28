import { UciService } from './../../services/uci.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UciEventsService } from '../../uci-events.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { NSDiscussData } from './../../models/discuss.model';

/* tslint:disable */
import * as _ from 'lodash'
import { IdiscussionConfig } from '../../models/discussion-config.model';
import { ConfigService } from '../../services/config.service';
/* tslint:enable */
@Component({
  selector: 'lib-lib-entry',
  templateUrl: './lib-entry.component.html',
  styleUrls: ['./lib-entry.component.scss']
})
export class LibEntryComponent implements OnInit {

  data: IdiscussionConfig;

  constructor(
    public activatedRoute: ActivatedRoute,
    private UciService: UciService,
    private configService: ConfigService,
    private location: Location,
    private uciEventsService: UciEventsService,
    private telemetryUtils: TelemetryUtilsService

  ) { }

  ngOnInit() {
    /*this.configService.setConfig(this.activatedRoute);
    // this.activatedRoute.data.subscribe((data) => {
    this.data = this.configService.getConfig();
    if (!this.data) {
      // fallback for query params
      this.configService.setConfigFromParams(this.activatedRoute);
      this.data = this.configService.getConfig();
    }*/
    // this.UciService.userName = _.get(this.data, 'userName');
    // const rawCategories = _.get(this.data, 'categories');
    // this.UciService.forumIds = _.get(rawCategories, 'result');
    // this.UciService.initializeUserDetails(this.UciService.userName);
   }

  goBack() {
    this.location.back();
  }

  close(event) {
    const eventAction = {
      action: 'DF_CLOSE'
    };
    this.uciEventsService.emitTelemetry(eventAction);
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.LIB_ENTRY);
  }
}
