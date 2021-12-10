import {Component} from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  // form?: FormGroup;
  // _active?: User;
  //
  // @Input()
  // set active(active: User) {
  //   if (!active) return;
  //
  //   this._active = active;
  //
  //   if (!this.form) {
  //     this.initGroup(active);
  //   } else {
  //     this.form.patchValue(active);
  //   }
  // }
  // // get active() {
  // //   return this._active;
  // // }
  //
  // @Output()
  // update = new EventEmitter<User>();
  //
  // private initGroup({ name, email }: User) {
  //   this.form = new FormGroup({
  //     username: new FormControl(name),
  //     email: new FormControl(email)
  //   });
  // }
}
