import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UciService} from '../../services/uci.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from 'moment/moment';
import {UciGraphQlService} from '../../services/uci-graph-ql.service';

@Component({
    selector: 'lib-conversation-add',
    templateUrl: './conversation-add.component.html',
    styleUrls: ['./conversation-add.component.css']
})
export class ConversationAddComponent implements OnInit {
    currentViewState = 'ADD_CONVERSATION';
    stepIndex = 1;
    selectedLogic = [];
    userSegments = [];
    column = '';
    sortDirection = '';
    reverse = false;
    collectionListModal = false;
    isLoaderShow = false;
    isModalLoaderShow = false;
    logicFormRequest = {};
    isCheckedTermCondition = false;
    conversationForm: FormGroup;
    logicForm: FormGroup;
    termsAndConditionModal = false;
    userSegmentItemId;
    selectedLogicIndex;

    constructor(
        private uciService: UciService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.conversationForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            purpose: ['', Validators.required],
            startingMessage: ['', Validators.required],
            startDate: [''],
            endDate: [''],
            status: ['Draft']
        });

        this.logicForm = this.fb.group({
            id: [null],
            name: ['', Validators.required],
            description: [''],
            formId: ['', Validators.required]
        });

        // Edit case
        this.userSegmentItemId = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.userSegmentItemId) {
            this.getUserSegmentDetail();
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
            this.stepIndex = 2;
        }
    }

    backToStepOne() {
        if (this.stepIndex === 2) {
            this.stepIndex = 1;
        }
    }

    sortColumns(column) {
        this.column = column;
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.reverse = !this.reverse;
    }

    onAddCancel() {
        this.router.navigate(['uci']);
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
        this.selectedLogic.forEach(logic => {
            reqObj.logic.push(logic.id);
        });

        this.isLoaderShow = true;

        if (this.userSegmentItemId) {
            this.uciService.botUpdate(this.userSegmentItemId, {data: reqObj}).subscribe(
                data => {
                    this.isLoaderShow = false;
                    this.router.navigate(['uci/success'], {queryParams: {text: reqObj.startingMessage}});
                }, error => {
                    this.isLoaderShow = false;
                }
            );
        } else {
            this.uciService.botCreate({data: reqObj}).subscribe(
                (data: any) => {
                    if (isTriggerBot) {
                        this.startConversation(data.data);
                    } else {
                        this.isLoaderShow = false;
                        this.router.navigate(['uci/success'], {queryParams: {text: reqObj.startingMessage}});
                    }
                }, error => {
                    this.isLoaderShow = false;
                }
            );
        }
    }

    startConversation(bot) {
        this.uciService.startConversation(bot.id).subscribe(
            data => {
                this.isLoaderShow = false;
                this.router.navigate(['uci/success'], {queryParams: {text: this.conversationForm.value.startingMessage}});
            }
        );
    }

    openModel() {
        this.logicFormRequest = {};
        this.collectionListModal = true;
        this.logicForm.reset();
    }

    openTermAndConditionModel() {
        this.termsAndConditionModal = true;
    }

    onLogicAdd() {
        const reqData = {
            ...this.logicForm.value,
            transformers: [
                {
                    id: 'bbf56981-b8c9-40e9-8067-468c2c753659',
                    meta: {
                        form: 'https://hosted.my.form.here.com',
                        formID: this.logicForm.value.formId
                    }
                }
            ],
            adapter: '44a9df72-3d7a-4ece-94c5-98cf26307324'
        };

        this.isModalLoaderShow = true;
        if (this.logicForm.get('id').value) {
            this.uciService.updateLogic(this.logicForm.get('id').value, {data: reqData}).subscribe(
                (data: any) => {
                    this.isModalLoaderShow = false;
                    const existingLogic = this.logicForm.value;
                    delete existingLogic.id;
                    this.selectedLogic[this.selectedLogicIndex] = Object.assign(this.selectedLogic[this.selectedLogicIndex], existingLogic);
                }, error => {
                    this.isModalLoaderShow = false;
                }
            );
        } else {
            this.uciService.createLogic({data: reqData}).subscribe(
                (data: any) => {
                    this.isModalLoaderShow = false;
                    const existingLogic = this.logicForm.value;
                    delete existingLogic.id;
                    this.selectedLogic.push({
                        id: data.data.id,
                        ...existingLogic,
                    });
                }, error => {
                    this.isModalLoaderShow = false;
                }
            );
        }

    }

    getEditLogicData(item, index) {
        if (item.id) {
            this.selectedLogicIndex = index;
            this.logicForm.patchValue({id: item.id, name: item.name, description: item.description});
        }
    }

    onFileUpload(event) {
        console.log(event);
        if (!event.target.files.length) {
            return;
        }
        const file = event.target.files[0];
        const obj = {
            form: file
        };
        this.logicForm.patchValue({formId: ''});
        this.isModalLoaderShow = true;
        this.uciService.uploadFile(obj).subscribe((fileInfo: any) => {
                if (fileInfo.formID) {
                    this.logicForm.patchValue({formId: fileInfo.formID});
                }
                this.isModalLoaderShow = false;
            }, error => {
                this.isModalLoaderShow = false;
            }
        );
    }

    onDelete(logic, index) {
        this.uciService.deleteLogic(logic.id).subscribe(
            file => {
                this.selectedLogic.splice(index, 1);
            }
        );
    }

    getUserSegmentDetail() {
        this.uciService.getBotUserDetails(this.userSegmentItemId).subscribe((val: any) => {
            if (val.data) {
                this.conversationForm.patchValue({
                    name: val.data.name,
                    description: val.data.description,
                    purpose: val.data.purpose,
                    startingMessage: val.data.startingMessage,
                    startDate: val.data.startDate ? moment(val.data.startDate).format('YYYY-MM-DD') : '',
                    endDate: val.data.endDate ? moment(val.data.endDate).format('YYYY-MM-DD') : ''
                });
                if (val.data.userSegments) {
                    this.userSegments = val.data.userSegments;
                }
                if (val.data.logic) {
                    this.selectedLogic = val.data.logic;
                }
            }
        });
    }
}
