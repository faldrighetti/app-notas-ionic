import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

export interface Note {
  title: string;
  description: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})

export class NoteService {
   
  private $notes = new BehaviorSubject<Note[]>([]);

  constructor( private firestore: Firestore) {}

  get notes(){
    return this.$notes.asObservable();
  }

  async addNote(data: Note){
    try {
      const dataRef: any = collection(this.firestore, 'notes'); //Toma la colección de datos de this.firestore
      const response = await addDoc(dataRef, data); //Agrega el array automáticamente.
      console.log(response);
      const id = await response?.id;
      const currentNotes = this.$notes.value;
      
      let notesArray: Note[] = [{...data, id}]; //Es un array de Note (título + descripción) que desestructura lo que hay en data y lo asigna allí.
      notesArray = notesArray.concat(currentNotes);
      this.$notes.next(notesArray); //Se emite el valor del array actualizado al observable $notes.
      return notesArray; //Devuelve el array.

    } catch (error) {
      throw (error);
    }
  }

  async getNote(){
      try {
        const dataRef: any = collection(this.firestore, 'notes');
        const queryInstant = await getDocs(dataRef); //Toma una instantánea, un snapshot de lo que hay en la colección.
        const notesGot: Note[] = await queryInstant.docs.map((doc) => {
          let item: any = doc.data();
          item.id = doc.id;
          return item;
        })
        this.$notes.next(notesGot);
        return notesGot;
      } catch (error) {
        throw (error);
      }
  }

  async editNote(id: string, data: Note){
    try {
      const dataRef: any = doc(this.firestore, `notes/${id}`);
      await updateDoc(dataRef, data);

      const currentNotes = this.$notes.value;
      const index = currentNotes.findIndex(element => element.id == id); //Busca el elemento cuyo id coincide con el del parámetro
      const latestData = {id, ...data};
      currentNotes[index] = latestData;
      this.$notes.next(currentNotes); //Lleva todo lo que hay en currentNotes al observable

      return latestData;
    } catch (error) {
      throw (error);
    }
  }

  async deleteNote(id: string){
    try {
      const dataRef: any = doc(this.firestore, `notes/${id}`);
      await deleteDoc(dataRef);
      let currentNotes = this.$notes.value;
      currentNotes = currentNotes.filter(element => element.id != id); //Crea un array con los elementos que cumplen la condición del filter
      this.$notes.next(currentNotes);
    } catch (error) {
      throw (error);
    }
  }
}
