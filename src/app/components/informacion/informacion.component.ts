import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../../services/event.service';
import { ComentariosService } from "../../services/comentarios.service";
import { AuthService } from "../../services/auth.service";
import { Event } from '../../models/event';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

declare let $ : any;
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {




  @ViewChild('imageURL') inputUrl: ElementRef;
  eventInfo : string = '';

  fressia = {
    title:'',
    description:'',
    main:'',
    images:'',
    date:''
  };

  inputImages = {
  titulo:'',
  images:''
  };

  images;

  comentarios:any = {}

comentario:any = {
  contenido:'',
  usuario:'',
  fecha:''

}

  events: Event[];
  editState: boolean = false;
  eventToEdit: Event;

  public app_name: string = 'PachappEvent';
  public isLogged : boolean = false;
  uploadPercent: Observable<number>;
  urlImage:  Observable<string>;

  isAdmin:boolean = false

  constructor(private eventService : EventService,
    private storage: AngularFireStorage,
    private acttivatedROute: ActivatedRoute,
    private _ComentariosService:ComentariosService,
    private _AuthService:AuthService,
    ) {

    this.acttivatedROute.params.subscribe ( params => {

      this.eventInfo = params.id;
      // console.log(this.eventInfo);

    });

   }


  ngOnInit() {

  $(document).ready(function(){
    $('.modal').modal();
  });

  $(document).ready(function(){
    $('.materialboxed').materialbox();
  });

    this.eventService.getEvent(this.eventInfo).subscribe(infoEVent => {
          //S console.log('fressia', infoEVent);
          this.fressia = infoEVent;
          //  console.log('laal',this.fressia);
        });
      this.eventService.getEventImages(this.eventInfo).subscribe(imageEvent =>{
        //S console.log('fressia', infoEVent);
        this.images = imageEvent;
        // console.log('Imagen',this.images);
      });


    this.eventService.getEventImages(this.eventInfo).subscribe(imageEvent =>{
      // this.eventImages = imageEvent;
      console.log('Imagenes de mrd',imageEvent);
    })

    this._ComentariosService.getComentarios(this.eventInfo).subscribe(comentarios =>{
      console.log(comentarios);

      this.comentarios = comentarios

    })

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
    const filePath = `uploads/pachapp_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize( () => {
      this.urlImage = ref.getDownloadURL()
    })).subscribe();
  }

  SubmitEvent(fressia){
    // console.log('Paco', this.eventInfo);
    this.eventService.SubmitEvent(fressia, this.eventInfo);
    this.fressia.main = '';

  }


  addEventImage (){
  this.inputImages.images = this.inputUrl.nativeElement.value;
  this.eventService.addEventImage(this.inputImages,this.eventInfo);
  console.log(this.inputImages);
  console.log(this.eventInfo);

  }

  addComentarios(){
    // console.log(comentarios);
    let a = this._AuthService.isAuth().subscribe(auth =>{
      this.comentario.usuario = auth.email
      this.comentario.fecha = firebase.firestore.FieldValue.serverTimestamp()
      this._ComentariosService.addComentarios(this.eventInfo,this.comentario)
      this.comentario.contenido='';
    })





  }

}
