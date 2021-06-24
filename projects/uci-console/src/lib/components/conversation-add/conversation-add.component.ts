import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'lib-conversation-add',
    templateUrl: './conversation-add.component.html',
    styleUrls: ['./conversation-add.component.css']
})
export class ConversationAddComponent implements OnInit {
    stepIndex: number = 1;
    conversationFLowList = [
        // {
        //     step: '1',
        //     name: 'test',
        //     description: 'abcd'
        // }
    ];
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
    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    userSegment() {
        this.router.navigateByUrl('uci/user-segment');
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
}
