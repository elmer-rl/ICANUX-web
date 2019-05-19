import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';;
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  comentariosCollection: AngularFirestoreCollection<any>;
  
  comentarios: Observable<any>;

  eventDoc: AngularFirestoreDocument<any>;

  constructor(public _AngularFirestore:AngularFirestore, ) { }

  getComentarios(idevent){

    this.comentariosCollection = this._AngularFirestore.collection(`events/${idevent}/comentarios`)
    return this.comentarios = this.comentariosCollection.snapshotChanges()
      .pipe(map(actions =>
        actions.map(a => {

          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data

        })
      ))
  }

  addComentarios(idevent, comentario){

    this.comentariosCollection = this._AngularFirestore.collection(`events/${idevent}/comentarios`);
    this.comentariosCollection.add(comentario);

  }
}
