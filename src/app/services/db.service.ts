import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as firebase from 'firebase';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ToDo } from '../models';
import { FirebaseService } from '../pages/login/firebase.service';
import { DraftToDo } from './../models';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db: firebase.firestore.Firestore;
  private _todos$ = new BehaviorSubject<ToDo[]>([]);

  get todos$() {
    return this._todos$.asObservable();
  }

  constructor(private firebaseService: FirebaseService) { }

  init() {
    this.db = firebase.firestore();
  }

  getToDos(targetDate?: Date): void {
    const today = dayjs(targetDate || new Date()).format('YYYY/MM/DD');
    const tomorrow = dayjs(targetDate || new Date()).add(1, 'day').format('YYYY/MM/DD');
    const userId = this.firebaseService.getUser().uid;
    from(
      this.db.collection('todos')
        .where('userId', '==', userId)
        .where('date', '>=', new Date(today))
        .where('date', '<', new Date(tomorrow))
        .get()).subscribe(querySnapshot => {
          const data = [];
          querySnapshot.forEach((doc) => {
            const d = doc.data();
            data.push({
              ...d,
              date: d.date.toDate(),
              id: doc.id
            });
          });
          this._todos$.next(data);
        });
  }

  addToDo(draft: DraftToDo): Observable<void> {
    const user = this.firebaseService.getUser().uid;
    return from(this.db.collection('todos').doc().set(
      {
        ...draft,
        date: firebase.firestore.Timestamp.fromDate(new Date(draft.date)),
        isDone: false,
        userId: user
      }
    ));
  }

  updateToDo(id: string, updates: Partial<ToDo>): Observable<void> {
    const parsedUpdates = updates.date ? { ...updates, date: new Date(updates.date) } : updates;
    return from(this.db.collection('todos').doc(id).set(
      parsedUpdates, { merge: true }
    ));
  }

  deleteToDo(id: string) {
    return from(this.db.collection('todos').doc(id).delete());
  }
}
