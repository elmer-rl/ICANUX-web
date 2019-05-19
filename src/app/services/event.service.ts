import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsCollection: AngularFirestoreCollection<any>;
  // events: Observable<Event[]>;
  events: Observable<any>;
  eventDoc: AngularFirestoreDocument<any>;

  constructor(public afs: AngularFirestore) {


  }

  getEvents() {
    this.eventsCollection = this.afs.collection('events');
    return this.events = this.eventsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Event;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
}
addEvent(events: Event) {
  this.eventsCollection.add(events);
}


deleteEvent(event: Event) {
  this.eventDoc = this.afs.doc(`events/${event.id}`);
  this.eventDoc.delete();
}


 updateEvent(event: Event) {
 this.eventDoc = this.afs.doc(`events/${event.id}`);
 this.eventDoc.update(event);
 }


getEvent(ide) {
  this.eventDoc = this.afs.doc(`events/${ide}`);
  return this.events = this.eventDoc.valueChanges();
}

SubmitEvent(fressia,idx) {
  console.log('Paco y fressi', fressia,idx);
  this.eventDoc = this.afs.doc(`events/${idx}`);
  this.eventDoc.update(
   fressia
  );}




  getEventImages(ide) {
    this.eventsCollection = this.afs.collection(`events/${ide}/imagenesEvent`);
    return this.events = this.eventsCollection.valueChanges();
  }



  addEventImage(fressia, idx) {
  this.eventsCollection = this.afs.collection(`events/${idx}/imagenesEvent`);
  this.eventsCollection.add(fressia);
  }

}
