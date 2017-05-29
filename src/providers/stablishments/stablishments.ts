import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the StablishmentsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StablishmentsProvider {
  stablishments: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    console.log('Hello StablishmentsProvider Provider');
    this.stablishments = db.list('/stablishments');
  }

  public getStablishments(): FirebaseListObservable<any[]>{
    return this.stablishments;
  }

}
