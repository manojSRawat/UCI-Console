import {Component, OnInit} from '@angular/core';
import {UciService} from '../../services/uci.service';
import {Router} from '@angular/router';

@Component({
    selector: 'lib-user-segment-list',
    templateUrl: './user-segment-list.component.html',
    styleUrls: ['./user-segment-list.component.css']
})
export class UserSegmentListComponent implements OnInit {
    userSegmentList = [
        {
            name: 'tester',
            Category: '123',
            total_member: '12',
            update: 'xyz',
        },
        {
            name: 'tester',
            Category: '123',
            total_member: '12',
            update: 'xyz',
        },
        {
            name: 'tester',
            Category: '123',
            total_member: '12',
            update: 'xyz',
        }
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
    queryParams: any;
    search;
    constructor(
        private uciService: UciService,
        private route: Router
    ) {
    }

    ngOnInit() {
        this.getUserSegment();
    }

    getUserSegment() {
        const param = {
            search: this.search
        };
        this.uciService.fetchUserSegment(param).subscribe(
            data => {
                this.userSegmentList = data.data;
                // this.pager = {
                //     totalItems: data.total,
                //     currentPage: 1,
                //     pageSize: 10,
                //     totalPages: Math.ceil(data.total / this.pager.pageSize),
                //     startPage: 0,
                //     endPage: 0,
                //     startIndex: 0,
                //     endIndex: 0,
                //     pages: []
                // };
                // let i = 1;
                // while (i <= Math.ceil(data.total / this.pager.pageSize)) {
                //     this.pager.pages.push(i);
                //     i++;
                // }
                // console.log(this.pager);
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
        this.route.navigate(['u', this.pageNumber], {queryParams: this.queryParams});
    }

    getSearch() {
        console.log('--->>>search', this.search);
        this.getUserSegment();
    }
}
