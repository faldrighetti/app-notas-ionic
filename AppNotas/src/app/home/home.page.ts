import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Note, NoteService } from '../services/notes/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  constructor(private note: NoteService){}

  @ViewChild(IonModal) ionModal!: IonModal;
  noteSubscription!: Subscription;
  model: any = {};
  notesArray: Note[] = [];
  isOpen: boolean = false;

  ngOnInit(): void {
    this.note.getNote()
    this.noteSubscription = this.note.notes.subscribe({
      next: (notes) => {
        this.notesArray = notes;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.model = {};
    this.isOpen = false;
  }

  cancel() {
    this.ionModal.dismiss(null, 'cancel');
  }

  async save(form: NgForm) {
    try {
      if(!form.value.title || !form.value.description){
        //Llamar a un ion-alert
        return;
      }
      else {
        console.log(form.value);
        if(this.model.id){
          await this.note.editNote(this.model.id, form.value);
        } else{
          await this.note.addNote(form.value);
        }
        this.ionModal.dismiss();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editNote(note: Note){
    try {
      this.isOpen = true;
      this.model = {...note}
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNote(note: Note){
    try {
      await this.note.deleteNote(note?.id!);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    if(this.noteSubscription){
      this.noteSubscription.unsubscribe();
    }
  }
}
