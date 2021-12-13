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
    <div class="error-dialog">
      <div mat-dialog-content>
        <p>Something is wrong...</p>
        <p>{{data.message}}</p>
      </div>
    </div>
  `,
  styleUrls: ['./error-dialog.css']
})
export class ErrorDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<ErrorDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.dialogRef.updatePosition({
      left: `20px`,
      bottom: `50px`
    });

    const timeout = 3000;
    this.dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        this.dialogRef.close();
      }, timeout)
    })
  }
}
