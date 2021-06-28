import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UciService} from '../../services/uci.service';
import {Router} from '@angular/router';

@Component({
    selector: 'lib-user-segment-list',
    templateUrl: './user-segment-list.component.html',
    styleUrls: ['./user-segment-list.component.css']
})
export class UserSegmentListComponent implements OnInit {
    @Output() cancel = new EventEmitter<boolean>();
    @Output() add = new EventEmitter<any>();
    @Input() selectedUserSegments = [];

    userSegments = [];
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
            page: this.pager.currentPage,
            perPage: this.pager.pageSize
        };

        this.uciService.fetchUserSegment(param).subscribe(
            data => {
                const selectedIds = [];
                this.selectedUserSegments.forEach(selectedUserSegment => {
                    selectedIds.push(selectedUserSegment.id);
                });
                this.userSegments = [];
                data.data.forEach(segment => {
                    segment.isSelected = selectedIds.indexOf(segment.id) !== -1;
                    this.userSegments.push(segment);
                });
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
        // console.log('--->>>search', this.search);
        this.getUserSegment();
    }

    onCancel() {
        this.cancel.emit(false);
    }

    onAdd() {
        const selectedSegments = [];
        this.userSegments.forEach(userSegment => {
            if (userSegment.isSelected) {
                selectedSegments.push(userSegment);
            }
        });

        this.add.emit(selectedSegments);
    }
}
