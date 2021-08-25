import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[];
  private userServ: UserService;

  constructor(userService: UserService) { 
    this.userServ = userService;
  }

  ngOnInit() {
    this.userServ.getUsers().subscribe(
        (users) => this.users = users
    );
  }

  delete(user: User): void{
    this.userServ.delete(user.id).subscribe(
      response => {
        this.users = this.users.filter(us => us !== user)
      }
    )
  }
}
