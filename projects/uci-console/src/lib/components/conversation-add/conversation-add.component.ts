import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

import {GlobalService} from '../../services/global.service';
import {UciService} from '../../services/uci.service';
import moment from 'moment/moment';
import {debounceTime} from 'rxjs/operators';
import {ToasterService} from '../../services/toaster.service';
import {MatDialog} from '@angular/material/dialog';
import {AddLogicComponent} from '../add-logic/add-logic.component';
import {TermsConditionsComponent} from '../terms-conditions/terms-conditions.component';
import {TermsConditionConfirmComponent} from '../terms-condition-confirm/terms-condition-confirm.component';
import {MatStepper} from '@angular/material/stepper';

@Component({
    selector: 'lib-conversation-add',
    templateUrl: './conversation-add.component.html',
    styleUrls: ['./conversation-add.component.scss'],
})
export class ConversationAddComponent implements OnInit {
    @ViewChild('verifyAllModal') verifyAllModal;
    @ViewChild('horizontalStepper') horizontalStepper;
    @ViewChild('verticalStepper') verticalStepper;
    currentViewState = 'ADD_CONVERSATION';
    stepIndex = 1;
    botLogics = [];
    userSegments = [];
    column = '';
    sortDirection = '';
    reverse = false;
    collectionListModal = false;
    isLoaderShow = false;
    isModalLoaderShow = false;
    logicFormRequest = {};
    isCheckedTermCondition = false;
    conversationForm: UntypedFormGroup;
    termsAndConditionModal = false;
    verifyAllItemsModal = false;
    conversationId;
    selectedLogicIndex;
    startMinDate = new Date(moment().subtract(1, 'd').format('YYYY-MM-DD'));
    endMinDate;
    allChecked: boolean;
    isSubmit: boolean;
    isStartingMessageExist = false;
    isStartingMessageAvailable = false;
    fileErrorStatus;
    user;
    resourceService;

    constructor(
        private uciService: UciService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private globalService: GlobalService,
        private toasterService: ToasterService,
        public dialog: MatDialog,
    ) {
        this.endMinDate = new Date(moment().add(1, 'days').format('YYYY-MM-DD'));
    }

    ngOnInit() {
        this.user = this.globalService.getUser();
        this.resourceService = this.globalService.getResourceService();
        if (!this.user) {
            this.router.navigate(['uci-admin']);
            return;
        }
        this.conversationForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            purpose: ['', Validators.required],
            startingMessage: ['', Validators.required],
            startDate: [null, Validators.required],
            endDate: [null],
            status: ['Draft']
        });

        // Edit case
        this.conversationId = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.conversationId) {
            this.getBotDetails();
        }
    }

    userSegment() {
        this.currentViewState = 'SELECT_SEGMENT';
    }

    onUserSegmentCancel() {
        this.currentViewState = 'ADD_CONVERSATION';
    }

    onUserSegmentAddClick() {
        this.currentViewState = 'ADD_SEGMENT';
    }

    onUserSegmentAdd(segments) {
        this.userSegments = segments;
        this.currentViewState = 'ADD_CONVERSATION';
    }

    onUserSegmentCreate(segment) {
        this.userSegments.push(segment);
        this.currentViewState = 'ADD_CONVERSATION';
    }

    onUserSegmentDelete(index) {
        this.userSegments.splice(index, 1);
    }

    nextStep() {
        if (this.stepIndex === 1 && this.conversationForm.valid) {
            this.horizontalStepper.next();
            this.verticalStepper.next();
            this.stepIndex = 2;
        }
    }

    backToStepOne() {
        if (this.stepIndex === 2) {
            this.stepIndex = 1;
            this.horizontalStepper.previous();
            this.verticalStepper.previous();
        }
    }

    onAddCancel() {
        this.router.navigate(['uci-admin']);
    }

    onSubmit(isTriggerBot = false) {
        const reqObj = {
            ...this.conversationForm.value,
            users: [],
            logic: []
        };
        this.userSegments.forEach(userSegment => {
            reqObj.users.push(userSegment.id);
        });
        this.botLogics.forEach(logic => {
            reqObj.logic.push(logic.id);
        });
        if (reqObj.startDate) {
            reqObj.startDate = moment(reqObj.startDate).format('YYYY-MM-DD');
        }
        if (reqObj.endDate) {
            reqObj.endDate = moment(reqObj.endDate).format('YYYY-MM-DD');
        }

        this.isLoaderShow = true;

        if (this.conversationId) {
            this.uciService.botUpdate(this.conversationId, {data: reqObj}).subscribe(
                data => {
                    this.closeVerifyModal();
                    this.isLoaderShow = false;
                    this.router.navigate(['uci-admin/success'], {queryParams: {text: reqObj.startingMessage, botId: this.conversationId}});
                }, error => {
                    this.isLoaderShow = false;
                    this.verifyAllItemsModal = true;
                    this.allChecked = false;
                    if (error.result && error.result.error) {
                        this.toasterService.error(error.result.error);
                    }
                }
            );
        } else {
            this.uciService.botCreate({data: reqObj}).subscribe(
                (data: any) => {
                    if (isTriggerBot) {
                        this.startConversation(data.data);
                    } else {
                        this.closeVerifyModal();
                        this.isLoaderShow = false;
                        this.router.navigate(['uci-admin/success'], {queryParams: {text: reqObj.startingMessage, botId: data.data.id}});
                    }

                }, error => {
                    this.isLoaderShow = false;
                    this.verifyAllItemsModal = true;
                    this.allChecked = false;
                    if (error.result && error.result.error) {
                        this.toasterService.error(error.result.error);
                    }
                }
            );
        }
    }

    startConversation(bot) {
        this.uciService.startConversation(bot.id).subscribe(
            data => {
                this.isLoaderShow = false;
                this.closeVerifyModal();
                this.router.navigate(['uci-admin/success'], {
                    queryParams: {
                        text: this.conversationForm.value.startingMessage,
                        botId: bot.id
                    }
                });
            }, error => {
                this.verifyAllItemsModal = true;
                this.allChecked = false;
                this.isLoaderShow = false;
                if (error.result && error.result.error) {
                    this.toasterService.error(error.result.error);
                }
            }
        );
    }

    closeVerifyModal() {
        if (this.verifyAllModal) {
            this.verifyAllModal.deny('denied');
        }
        this.verifyAllItemsModal = false;
    }

    openTermAndConditionModel() {
        // this.termsAndConditionModal = true;
        const dialogRef = this.dialog.open(TermsConditionsComponent);

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    openItemsVerifyModal(isSubmitBtn: boolean) {
        this.verifyAllItemsModal = true;
        this.allChecked = false;
        this.isSubmit = isSubmitBtn;
        const dialogRef = this.dialog.open(TermsConditionConfirmComponent, {
            data: {isSubmit: this.isSubmit}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.onSubmit(result);
            }
        });
    }

    getBotDetails() {
        this.uciService.getBotDetails(this.conversationId).subscribe((val: any) => {
            if (val.data) {
                this.conversationForm.patchValue({
                    name: val.data.name,
                    description: val.data.description,
                    purpose: val.data.purpose,
                    startingMessage: val.data.startingMessage,
                    status: val.data.status,
                    startDate: val.data.startDate ? new Date(moment(val.data.startDate).format('YYYY-MM-DD')) : null,
                    endDate: val.data.endDate ? new Date(moment(val.data.endDate).format('YYYY-MM-DD')) : null
                });
                if (val.data.startDate) {
                    const minDate = moment().isBefore(moment(val.data.startDate)) ? moment().subtract(1, 'd') : moment(val.data.startDate);
                    this.startMinDate = new Date(moment(minDate).format('YYYY-MM-DD'));
                }
                if (val.data.userSegments) {
                    this.userSegments = val.data.userSegments;
                }
                if (val.data.logic) {
                    this.botLogics = val.data.logic;
                }
            }
        });
    }

    onStarringMessageChange() {
        this.uciService.getCheckStartingMessage({startingMessage: this.conversationForm.value.startingMessage}).subscribe(val => {
            if (val && val.data && val.data.id) {
                this.isStartingMessageExist = (this.conversationId !== val.data.id);
            }
        }, error => {
            this.isStartingMessageExist = false;
        });

    }

    onBotLogicModify(bots) {
        this.botLogics = bots;
    }
}
