import {Component, OnInit} from '@angular/core';
import {UciService} from '../../services/uci.service';
import {Router} from '@angular/router';

@Component({
    selector: 'lib-conversation-list',
    templateUrl: './conversation-list.component.html',
    styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
    chatBots = [];
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
    queryParams: any;
    search;
    constructor(
        private uciService: UciService,
        private route: Router
    ) {
    }

    ngOnInit() {
        this.getAllChatBots();
    }

    getAllChatBots() {
        const param = {
            page: this.pager.currentPage,
            perPage: this.pager.pageSize
        };

        if (this.search) {
            // param['search'] = this.search;
        }
        this.uciService.fetchAllChatBots(param).subscribe(
            data => {
                this.chatBots = [];
                data.data.forEach(bot => {
                    const obj = {...bot, userCount: 0};
                    bot.userSegments.forEach(userSegment => {
                        obj.userCount += (userSegment.count || 0);
                    });

                    this.chatBots.push(obj);
                });
                this.pager.totalItems = data.total;
                this.pager.totalPages = Math.ceil(data.total / this.pager.pageSize);
                this.pager.pages = [];
                let i = 1;
                while (i <= Math.ceil(data.total / this.pager.pageSize)) {
                    this.pager.pages.push(i);
                    i++;
                }
                console.log(this.pager);
            }
        );
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
        this.pager.currentPage = page;
        this.getAllChatBots();
        // this.route.navigate(['u', this.pageNumber], {queryParams: this.queryParams});
    }

    getSearch() {
        this.getAllChatBots();
    }

    onAddNew() {
        this.route.navigateByUrl('uci/add');
    }

    onEdit() {

    }

    onStatus(botId, index) {
        this.uciService.toggleBotStatus(botId).subscribe(
            data => {
                this.chatBots[index].status = 'Live';
            }
        );
    }
}
