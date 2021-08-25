import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Category } from '../categories/category';
import { UserService } from './user.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public user: User = new User();
  public categories: Category[];

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if(id){
        this.userService.getUser(id).subscribe((user) => this.user = user);
      }
    });
    this.userService.getCategories().subscribe(categories => this.categories = categories);
  }

  create(): void {
    this.userService.create(this.user).subscribe(
      user => {
        this.router.navigate(['/users']);
      }
    )
  }
  
  update(): void{
    this.userService.update(this.user).subscribe(
      user => {
        this.router.navigate(['/users'])
      }
    )
  }

  compareCategory(o1: Category, o2: Category): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}
