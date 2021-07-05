import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'lib-conversation-success',
    templateUrl: './conversation-success.component.html',
    styleUrls: ['./conversation-success.component.css']
})
export class ConversationSuccessComponent implements OnInit {
    text = '';

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.text = this.activatedRoute.snapshot.queryParams.text || '';
    }

    onCopy() {
        const val = document.getElementById('copyUrl').innerText;
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    onClose() {
        this.router.navigate(['/uci']);
    }

}
