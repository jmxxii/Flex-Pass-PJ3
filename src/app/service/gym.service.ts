import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class GymService {

  constructor(private http: Http,
    private myService: SessionService) { }
  myGym: any;
  tempGym: any;

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  newGym(gymID, user) {
    const gymId = { gymId: gymID, userId: user._id };
    console.log(`THIS PART WORKS`, gymID);
    return this.http.post(`http://localhost:3000/select-gyms`, gymId)
    .map(res => {
        console.log('res is WHATTTT IS ITT!!!!!!: ', this.myGym);
        res.json();
      })
      .catch(this.handleError);
  }

  // getGym() {
  //   console.log(`this is the user in the get gym click!!`);
  //   return this.http.get(`http://localhost:3000/flex`)
  //   .map(res => {
  //     // console.log(`this is the result from res---->`, res);
  //     this.tempGym = res;
  //     // console.log(`this is the tempGYm`, this.tempGym);
  //     // this.myGym = JSON.parse(this.tempGym._body);
  //     // console.log(`Getting Users GYM List`, this.myGym);
  //     // this.tempGym = JSON.parse(this.tempGym);
  //     this.tempGym.json();
  //   })
  //   .catch(this.handleError);
  // }

  getAllGyms(user) {
    console.log(`does this show the user!!!?!?!?!?!?!?!?`, user);
    return this.http.post(`http://localhost:3000/flex`, user)
        .map(res =>
          res.json()
        );
                    // console.log(`this is the res??????`, res.json());
          // return res.json();


  }

  getSingleGym(oneGym) {

  }


}