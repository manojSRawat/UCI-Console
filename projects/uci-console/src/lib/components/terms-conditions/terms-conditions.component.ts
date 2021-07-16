import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UciService} from '../../services/uci.service';
import {UciGraphQlService} from '../../services/uci-graph-ql.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'lib-terms-conditions',
    templateUrl: './terms-conditions.component.html',
    styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

}
