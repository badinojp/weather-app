import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PronosticoService {

  constructor(private http: HttpClient) { }

  getPronosticoCiudadPrincipal(lat, long) {
    return this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=9cf2b53054863aadbee2701a07545590');
  }

  getPronosticoCiudadSecundaria(nombrePais){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + nombrePais + '&appid=9cf2b53054863aadbee2701a07545590');
  }
}
