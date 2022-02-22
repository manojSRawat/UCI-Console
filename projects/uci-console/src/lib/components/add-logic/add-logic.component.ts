import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GlobalService} from '../../services/global.service';

@Component({
    selector: 'add-logic',
    templateUrl: './add-logic.component.html',
})
export class AddLogicComponent {
    resourceService;

    constructor(
        private globalService: GlobalService,
        public dialogRef: MatDialogRef<AddLogicComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.resourceService = this.globalService.getResourceService();
    }

    onCancel(): void {
        this.dialogRef.close();
    }

}
