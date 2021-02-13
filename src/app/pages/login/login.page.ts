import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() { 
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
      (data) => {

        // exibe feedback
        this.myAlert(
          `Olá ${data.user.displayName}!`,
          'Você já pode acessar acessar todos os recursos do aplicativo.'
        );
      }
    )
    .catch((error) => {console.log(error)});
  }

  // Método que exibe popup
  async myAlert(title: string, text: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home']);
        }

      }]
    });
    alert.present();
  }

}
