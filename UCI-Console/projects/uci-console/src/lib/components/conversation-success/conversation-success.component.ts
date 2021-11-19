import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Helper} from '../../utils/helper';

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
        this.url = Helper.makBotUrl(this.activatedRoute.snapshot.queryParams.text || '');
        this.botId = this.activatedRoute.snapshot.queryParams.botId || '';
    }

    onCopy(id) {
        Helper.copyData(id);
    }

    onClose() {
        this.router.navigate(['/uci-admin']);
    }

}
