import { Observable } from 'rxjs/Observable';
import { EventService } from './../../services/event.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Event } from '../../models/event';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';

declare let $ : any;
@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent implements OnInit {

  @ViewChild('imageURL') inputUrl: ElementRef;

  event: Event = {
    title:'',
    description:'',
    main:'Este es una descripción de ejemplo para esta avista',
    images:'',
    date:''
  };

isAdmin:boolean = false

  events: Event[];
  editState: boolean = false;
  eventToEdit: Event;


  constructor(private eventService: EventService,
    private storage: AngularFireStorage,
    private authService: AuthService,

    private _AuthService:AuthService) {  }



  public app_name: string = 'PachappEvent';
  public isLogged : boolean = false;
  uploadPercent: Observable<number>;
  urlImage:  Observable<string>;



  ngOnInit() {

    $(document).ready(function(){
      $('.datepicker').datepicker();
    });

    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      console.log(this.events)
    });

    this.getCurrentUser();

    this._AuthService.isAuth().subscribe(auth =>{
      if (auth.email == 'elmerrl1996@gmail.com') {
        this.isAdmin = true
      }
    })
  }

  onUpload(e){
    // console.log('subir',e);
    const id = Math.random().toString(36).substring(2)
    const file = e.target.files[0];
    const filePath = `uploads/icanux_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize( () => {
      this.urlImage = ref.getDownloadURL()
    })).subscribe();
  }

  // date ($){
  //   $(document).ready(function(){
  //     $('.datepicker').datepicker();
  //   });
  // }


  onSubmit(){

  if(this.event.title !='' && this.event.description !='') {
      this.event.images = this.inputUrl.nativeElement.value;
      this.eventService.addEvent(this.event);
       this.event.title = '';
       this.event.description = '';
       this.event.main='';
       this.event.images='';
  }

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
getCurrentUser(){
  this.authService.isAuth().subscribe(auth => {
    if(auth){
      // console.log('user loged');
      this.isLogged= true;
    }
    else{
      // console.log('user unloged');
      this.isLogged = false;
    }
  })
}

}

