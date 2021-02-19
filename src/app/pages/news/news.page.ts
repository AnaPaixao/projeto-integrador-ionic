import { Component, OnInit } from '@angular/core';

//dependências
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private apiKey = '0420c6b9c66e4a0eb5c045f951c792ec'; // newsapi.org
  private apiQuery = 'astronomia' // tema das noticias 
  private apiItens = 10 ; // quantidade 
  private apiURL = `https://newsapi.org/v2/everything?apiKey=${this.apiKey}&source=google-news-br&language=pt&q=${this.apiQuery}`;
  private newsList: any;

  constructor(
    // injetar dependências 
    private http: HttpClient
  ) { }

  ngOnInit() {
    // usando JSON para obter as noticias 
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.newsList = data.articles.slice(0, this.apiItens);
    });
  }

  readNews(link: any) {
    window.open(link);
    return false;
  }

}
