import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-errors-popup',
  templateUrl: './errors-popup.component.html',
  styleUrls: ['./errors-popup.component.css']
})
export class ErrorsPopupComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog(errorMessage: string) {
    this.dialog.open(ErrorDialog, {
      data: {
        message: errorMessage
      }
    });
  }
}

@Component({
  selector: 'error-dialog',
  template: `
    <div>
      <div mat-dialog-content >
        <h3 class="error-message">Something is wrong...</h3>
        <h3 class="error-message">{{data.message}}</h3>
      </div>
    </div>
  `,
  styleUrls: ['./error-dialog.css', "../../app.component.css"]
})
export class ErrorDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<ErrorDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    const timeout = 3000;
    this.dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        this.dialogRef.close();
      }, timeout)
    })
  }
}
