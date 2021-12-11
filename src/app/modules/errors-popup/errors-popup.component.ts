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
export class ErrorsPopupComponent implements OnInit {
  public errorMessage: string = 'testError';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(errorMessage: string) {
    // this.errorMessage = errorMessage
    // console.log(this.errorMessage)
    const timeout = 3000;
    const dialogRef = this.dialog.open(Dialog, {
      width: '300px',
      data: {
        message: errorMessage
      }
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout)
    })
  }
}

@Component({
  selector: 'Dialog',
  template: `
    <div style="visibility: visible">
      <p>test</p>
      <p>{{data.message}}</p>
    </div>
  `
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
