import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private itemsCollection: AngularFirestoreCollection;
  items: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
      this.itemsCollection = afs.collection<any>('articles',
      ref =>
        ref
        .where("status", "==", "ativo")
        .orderBy("date", "desc")
      );

      this.items = this.itemsCollection.valueChanges({idField: "artId"})
  }

  ngOnInit() {}
}