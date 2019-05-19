import { Event } from './../../models/event';
import { EventService } from './../../services/event.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[];
  editState: boolean = false;
  eventToEdit: Event;

  constructor(public eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }
  deleteEvent($event, event){
    const response = confirm('estas seguro de que quieres eliminar');
    if (response){
      this.eventService.deleteEvent(event);
    }
    return;
  }
  editEvent($event, event) {
    this.editState = !this.editState;
    this.eventToEdit = event;
  }

  updateEvent($event, event) {
    this.eventService.updateEvent(event);
    this.eventToEdit = null;
    this.editState = false;
}
cancelar(event){
  this.editState =!this.editState;
  this.eventToEdit=null;
}
}
