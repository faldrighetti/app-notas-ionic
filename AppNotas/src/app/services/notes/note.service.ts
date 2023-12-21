import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Note {
  title: string;
  description: string;
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
      
    } catch (error) {
      throw(error);
    }
  }

  async getNote(){
    try {
      
    } catch (error) {
      throw(error);
    }

  }

  async editNote(id: string, data: Note){
    try {
      
    } catch (error) {
      throw(error);
    }

  }

  async deleteNote(id: string){
    try {
      
    } catch (error) {
      throw(error);
    }

  }

  constructor() { }
}
