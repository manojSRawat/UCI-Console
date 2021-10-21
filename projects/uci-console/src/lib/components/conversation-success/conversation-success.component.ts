import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'lib-conversation-success',
    templateUrl: './conversation-success.component.html',
    styleUrls: ['./conversation-success.component.css']
})
export class ConversationSuccessComponent implements OnInit {
    url = '';
    botId = '';

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        // tslint:disable-next-line:max-line-length
        this.url = encodeURI('https://api.whatsapp.com/send?text=' + (this.activatedRoute.snapshot.queryParams.text || '') + '&phone=+912249757677');
        this.botId = this.activatedRoute.snapshot.queryParams.botId || '';
    }

    onCopy(id) {
        const val = document.getElementById(id).innerText;
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
        this.router.navigate(['/uci-admin']);
    }

}
