import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public alertController: AlertController
  ) { }

  async myAlert(header: string, message: string, handler: any) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'Ok',
        handler: handler
      }]
    });
    await alert.present();
  }
}
