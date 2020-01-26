import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { FirebaseService } from './login/firebase.service';
import { ToDo } from './models';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: firebase.firestore.Firestore;

  constructor(private firebaseService: FirebaseService) { }

  init() {
    this.db = firebase.firestore();
  }

  getToDos(): Observable<ToDo[]> {
    const today = dayjs().format('YYYY/MM/DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY/MM/DD');
    const userId = this.firebaseService.getUser().uid;
    return from(
      this.db.collection('todos')
        .where('userId', '==', userId)
        .where('date', '>=', new Date(today))
        .where('date', '<', new Date(tomorrow))
        .get()).pipe(
          flatMap(querySnapshot => {
            const data = [];
            querySnapshot.forEach((doc) => {
              const d = doc.data();
              data.push({
                ...d,
                date: d.date.toDate()
              });
            });
            return of(data);
          }),
        );
  }
}
