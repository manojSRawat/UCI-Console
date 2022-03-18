import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GlobalService} from '../../services/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UciService} from '../../services/uci.service';
import {ToasterService} from '../../services/toaster.service';

@Component({
    selector: 'lib-exhaust-report',
    templateUrl: './exhaust-report.component.html',
    styleUrls: ['./exhaust-report.component.scss'],
})
export class ExhaustReportComponent {
    resourceService;
    displayedColumns: string[] = ['requestid', 'requesttype', 'requestdate', 'conversationid', 'startdate', 'enddate', 'status', 'reportlink', 'generateddate'];
    dataSource = [
        {
            requestid: 'dhheb1234',
            requesttype: 'Response Exhaust',
            requestdate: '14 / 03 / 2022',
            conversationid: 'uik123',
            startdate: '10 / 03 / 2022',
            enddate: '11/03/2022',
            status: 'Submitted',
            reportlink: '-',
            generateddate: '-'
        },
        {
            requestid: 'dhheb9876',
            requesttype: 'Private Exhaust',
            requestdate: '14 / 03 / 2022',
            conversationid: 'uik123',
            startdate: '10 / 03 / 2022',
            enddate: '11/03/2022',
            status: 'Success',
            reportlink: '-',
            generateddate: '15 / 03 / 2022'
        },
    ];

    constructor(
        private uciService: UciService,
        private fb: FormBuilder,
        private toasterService: ToasterService,
        private globalService: GlobalService) {
        this.resourceService = this.globalService.getResourceService();
    }


}
