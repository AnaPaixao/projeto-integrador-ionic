import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public auth: AngularFireAuth
  ) {}

  openURL(){
    window.open("http://visit.rio/que_fazer/museu-de-astronomia-e-ciencias-afins-mast/");
    return false;
  }
}
