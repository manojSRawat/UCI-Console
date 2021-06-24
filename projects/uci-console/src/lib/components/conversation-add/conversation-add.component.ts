import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UciService} from '../../services/uci.service';

// import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui-v9';

@Component({
    selector: 'lib-conversation-add',
    templateUrl: './conversation-add.component.html',
    styleUrls: ['./conversation-add.component.css']
})
export class ConversationAddComponent implements OnInit {
    // @ViewChild('modalTemplate', {static: false}) modalTemplate: ModalTemplate<{ data: string }, string, string>;

    stepIndex = 1;
    isUserSegmentVisible = false;
    conversationFLowList = [];
    pager: any = {
        totalItems: 0,
        currentPage: 1,
        pageSize: 10,
        totalPages: 0,
        startPage: 0,
        endPage: 0,
        startIndex: 0,
        endIndex: 0,
        pages: []
    };
    pageNumber = 1;
    column = '';
    sortDirection = '';
    reverse = false;
    formFieldProperties: Array<any>;
    userSegments = [];

    constructor(
        private uciService: UciService,
        private router: Router,
        // private modalService: SuiModalService
    ) {
    }

    ngOnInit() {
        this.getForm();
    }

    userSegment() {
        this.isUserSegmentVisible = true;
        // this.router.navigateByUrl('uci/user-segment');
    }

    onUserSegmentCancel() {
        this.isUserSegmentVisible = false;
    }

    onUserSegmentAdd(segments) {
        this.userSegments = segments;
        this.isUserSegmentVisible = false;
    }

    onUserSegmentDelete(index) {
        this.userSegments.splice(index, 1);
    }

    nextStep() {
        if (this.stepIndex === 1) {
            this.stepIndex = 2;
        }
    }

    sortColumns(column) {
        this.column = column;
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.reverse = !this.reverse;
    }

    navigateToPage(page: number): undefined | void {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pageNumber = page;
        // this.getAllChatBots();
        // this.route.navigate(['u', this.pageNumber], {queryParams: this.queryParams});
    }

    getForm() {
        this.uciService.readForm(
            {
                request: {
                    type: 'content',
                    subType: 'collection',
                    action: 'save',
                    framework: 'ekstep_ncert_k-12',
                    rootOrgId: '01309282781705830427'
                }
            }
        ).subscribe(
            (data: any) => {
                if (data.result && data.result.form && data.result.form.data) {
                    this.formFieldProperties = data.result.form.data.fields;
                }
            }
        );
    }

    onStatusChanges(event) {
        console.log('event', event);
    }

    valueChanges(event) {
        console.log('event value', event);
    }

    onAddCancel() {
        this.router.navigate(['uci']);
    }

    onSave() {
    }

    onSubmit() {
    }

    openModel() {
        /*const config = new TemplateModalConfig(this.modalTemplate);
        config.isClosable = false;
        config.size = 'small';
        config.transitionDuration = 0;
        config.mustScroll = true;
        this.modalService
            .open(config);*/
    }
}
