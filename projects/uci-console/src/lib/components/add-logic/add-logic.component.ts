import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-logic',
  templateUrl: './add-logic.component.html',
})
export class AddLogicComponent {

  constructor(
    public dialogRef: MatDialogRef<AddLogicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancel(): void {
    this.dialogRef.close();
  }

}
