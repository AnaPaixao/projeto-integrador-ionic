import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

// dependências
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { AppService }  from '../../services/app.service';

// não permitir somente espaços nos campos
import { AbstractControl } from '@angular/forms';
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null
} 

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {


  //atributos 
  public contactForm: FormGroup;
  pipe = new DatePipe('en_US');


  constructor(
    public form: FormBuilder,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public app: AppService
  ) { }

  ngOnInit() {
    // criar formulário de contatos
    this.contactFormCreate();

    // preencher os campos se o usuário estiver logado 
    if(this.contactForm) {
      this.auth.onAuthStateChanged(
        (userData) => {
          if(userData) {
            this.contactForm.controls.name.setValue(userData.displayName.trim());
            this.contactForm.controls.email.setValue(userData.email.trim());
          }
        }
      );
    }
  }
    // formulário de contatos
    contactFormCreate() {

      this.contactForm = this.form.group({
        date: [''],
        name: [
          '',
          Validators.compose([
            Validators.required, // Obrigatório
            Validators.minLength(3), // Pelo menos 3 caracteres
            removeSpaces
          ])
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            removeSpaces
          ])
        ],
        subject: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            removeSpaces
          ])
        ],
        message: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            removeSpaces
          ])
        ]
      });
    }

    // enviar formulário
    contactSend() {
      this.contactForm.controls.date.setValue(
        // formata data 
        this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
        );

        // salvar documento no Firestore
        this.afs.collection('contacts').add(this.contactForm.value).then(
          () => {
            // exibe o feedback
            this.app.myAlert(
              'Contato Enviado',
              'Seu contato foi enviado com sucesso!<br><br>Obrigado...',
              () => {

                // reiniciar o formulário
                this.contactForm.reset({
                  date: '',
                  name: this.contactForm.value.name.trim(),
                  email: this.contactForm.value.email.trim(),
                  subject: '',
                  message: ''
                });
              }
            );
          }
        )
        .catch(
          (error) => { console.error(error); }
        );
    }
}
