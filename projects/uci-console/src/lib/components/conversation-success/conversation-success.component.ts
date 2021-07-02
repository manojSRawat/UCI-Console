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
