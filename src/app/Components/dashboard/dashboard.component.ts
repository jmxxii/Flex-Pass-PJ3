import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/auth.service';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/rx';
import { Router } from '@angular/router';
import { GymService } from '../../service/gym.service';
import { SearchService } from '../../service/search.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;
  error: any;
  myFlex: any;
  gymList: any;
  gymListError: any;
  show: boolean;
  resultSearch: any = {};
  searchTerm: any;
  today: Date = new Date();
  gymReturn: any = this.mySearch.gymResults;
  thisIsWeek: any;
  theDay: any;
  gymSelected: any;


  constructor(
    private myService: SessionService,
    private myRouter: Router,
    private myGymService: GymService,
    private mySearch: SearchService
  ) {
    this.show = false;
   }

// ***********************************************************
  ngOnInit() {
    this.myService.isLoggedIn()
    .then(() => {
      this.myService.currentUser.subscribe((res) => {
        this.user = res;
        console.log(`DASHBOARD USER`, this.user);
        if (this.user === undefined || this.user === null ) {
          this.myRouter.navigate(['/login']);
        }
      });
      this.getUsersGyms();
    });
    }
// ***********************************************************
isDate(arrDay) {
  while (Date().includes(arrDay)) {
    // console.log('this is the current Date', Date());
    return this.show = true;
  }
}
// ***********************************************************
getUsersGyms() {
  // console.log(`who is the user?:::::::>`);
  // console.log(`does this happen---->`, this.myGymService.getAllGyms());
  this.myGymService.getAllGyms(this.user)
  .subscribe(usersGyms => {
    console.log('are these the usersGyms????: ', usersGyms);
    this.gymList = usersGyms;
  },
    () => { this.gymListError = 'Sorry, no gyms listed.'; }
  );
}
// ***********************************************************
deleteGym(gymID, userId) {
  console.log(`User to delete`, userId);
  console.log('gym id' , gymID);
  this.myGymService.removeGym(gymID, userId)
  .subscribe(
    (gymDeleted) => {
    console.log(gymDeleted);

    const found = this.gymList.find((gym) => {
      return gym.place_id === gymID;
    });
    const index = this.gymList.indexOf(found);
    this.gymList.splice(index, 1);
  },
  (err) => { this.error = err;
    console.log('GYM WAS NOT DELETED');
  });
}
// ***********************************************************
  logout() {
    this.myService.logout()
      .subscribe(
        (res) => {
          this.user = null;
          // console.log('logout', res);
          console.log(`this is the user `, this.user);
          this.myRouter.navigate(['/login']);
        });
  }

  addGym(gymID, user) {
    console.log(`WHAT IS GYM ID MANNNNNN`, gymID);
    console.log(`WHAT IS USER ID MANNNNNN`, user);
    this.myGymService.newGym(gymID, user)
    .subscribe(
      (gymAdded) => {
      console.log(gymAdded);
    },
    (err) => { this.error = err;
      console.log('Unsucessfully Added Gym');
    });
  }

  gymSearch() {
    console.log(`this is Search Term====>>>>>>`, this.resultSearch.searchTerm);
    this.mySearch.searchResult(this.resultSearch)
      .subscribe(

        (res) => {
          this.resultSearch.searchTerm = res;
        },
        (err) => this.error = err
      );

    }


}

