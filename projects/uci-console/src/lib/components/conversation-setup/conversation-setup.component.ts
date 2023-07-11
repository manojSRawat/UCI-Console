import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UciService} from '../../services/uci.service';
import {GlobalService} from '../../services/global.service';
import {MatDialog} from '@angular/material/dialog';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import moment from 'moment/moment';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'lib-conversation-setup',
    templateUrl: './conversation-setup.component.html',
    styleUrls: ['./conversation-setup.component.scss']
})
export class ConversationSetupComponent implements OnInit {
    @Input() conversationForm: UntypedFormGroup;
    @Input() isStartingMessageExist;
    @Input() startMinDate;
    @Input() userSegments;
    @Output() starringMessageChange = new EventEmitter<any>();
    @Output() userSegmentDelete = new EventEmitter<any>();
    matDateBreakpoint;
    endMinDate;
    resourceService;

    constructor(
        private fb: UntypedFormBuilder,
        private uciService: UciService,
        private globalService: GlobalService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.matDateBreakpoint = (window.innerWidth <= 1000) ? 1 : 2;
        this.resourceService = this.globalService.getResourceService();
        if (this.conversationForm) {
            // start date and end date value change
            this.conversationForm.get('startDate').valueChanges.subscribe(val => {
                if ((this.conversationForm.value.endDate && moment(this.conversationForm.value.endDate).isBefore(moment(val))) || !val) {
                    this.conversationForm.get('endDate').patchValue(null);
                }
                const tempDate = moment(val).format('YYYY-MM-DD');
                this.endMinDate = new Date(tempDate);
            });

            this.conversationForm.get('startingMessage').valueChanges
                .pipe(debounceTime(1000))
                .subscribe(
                    value => {
                        this.onStarringMessageChange();
                    }
                );
        }
    }

    onStarringMessageChange() {
        this.starringMessageChange.emit({});
    }

    onUserSegmentDelete(index) {
        this.userSegmentDelete.emit(index);
    }
}
