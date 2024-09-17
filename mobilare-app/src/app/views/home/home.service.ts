import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiKey = '13bcc277531f1e74d75bbe594770b9b9';

  private http = inject(HttpClient);

  constructor() { }

  getWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&lang=pt_br&units=metric`)
  }
}
