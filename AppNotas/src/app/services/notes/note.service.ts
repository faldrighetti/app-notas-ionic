import { Injectable } from '@angular/core';
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

  get notes(){
    return this.$notes.asObservable();
  }

  async addNote(data: Note){
    try {
      const currentNotes = this.$notes.value;
      let notesArray: Note[] = [{...data, id: (currentNotes.length + 1).toString()}]; //Es un array de Note (título + descripción) que desestructura lo que hay en data y lo asigna allí.
      notesArray = notesArray.concat(currentNotes);
      this.$notes.next(notesArray); //Se emite el valor del array actualizado al observable $notes.
      return notesArray; //Devuelve el array

    } catch (error) {
      throw(error);
    }
  }

  async getNote(){
    try {
      return [];
    } catch (error) {
      throw(error);
    }

  }

  async editNote(id: string, data: Note){
    try {
      const currentNotes = this.$notes.value;
      const index = currentNotes.findIndex(element => element.id == id); //Busca el elemento cuyo id coincide con el del parámetro
      currentNotes[index] = {id, ...data};
      this.$notes.next(currentNotes); //Lleva todo lo que hay en currentNotes al observable
    } catch (error) {
      throw(error);
    }
  }

  async deleteNote(id: string){
    try {
      let currentNotes = this.$notes.value;
      currentNotes = currentNotes.filter(element => element.id != id); //Crea un array con los elementos que cumplen la condición del filter
      this.$notes.next(currentNotes);
    } catch (error) {
      throw(error);
    }

  }

  constructor() { }
}
