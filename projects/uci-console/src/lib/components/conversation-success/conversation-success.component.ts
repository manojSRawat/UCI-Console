import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'lib-conversation-success',
    templateUrl: './conversation-success.component.html',
    styleUrls: ['./conversation-success.component.css']
})
export class ConversationSuccessComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    onCopy() {
    }

    onClose() {
        this.router.navigate(['/uci']);
    }

}
