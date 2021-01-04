import { Component, OnInit } from '@angular/core';
import { PronosticoService } from 'src/app/services/pronostico.service'

@Component({
  selector: 'app-pronostico',
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.sass']
})
export class PronosticoComponent implements OnInit {

  constructor(private pronosticoService: PronosticoService) { }

  pronosticoCiudadPrincipal: any = [];

  paises = [
    ['France', 'Paris'],
    ['Germany', 'Berlin'],
    ['Italy', 'Rome'],
    ['United States of America', 'Washington D.C.'],
    ['Spain', 'Madrid']
  ]

  pronosticoCiudadSecundaria: any = [];
  pronosticoCiudadSecundariaData;

  setPrimary(pais, index){
    console.log(this.pronosticoCiudadPrincipal)
    this.pronosticoCiudadSecundaria.push(this.pronosticoCiudadPrincipal[0])
    let latLong;
    switch (pais) {
      case 'Argentina':
        latLong = ['-34', '-64'];
        break;
      case 'France':
        latLong = [48, 2];
        break;
      case 'Germany':
        latLong = [52, 13];
        break;
      case 'Italy':
        latLong = [43, 12];
        break;
      case 'United States of America':
        latLong = [47, -120];
        break;
      case 'Spain':
        latLong = [40, -3];
        break;
      }
    this.getPronosticoCiudadPrincipal(latLong[0], latLong[1]);
    this.pronosticoCiudadSecundaria.splice(index, 1)
  }

  getPronosticoCiudadPrincipal(lat, long) {
    this.pronosticoCiudadPrincipal = [];
    this.pronosticoService.getPronosticoCiudadPrincipal(lat, long).subscribe((data)=>{
      data = Object.keys(data).map(key => ({type: key, value: data[key]}));
      for (var i = 0; i < 6; i++) {
          function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
          }
          var dt = new Date();
          dt = addDays(dt, i);
          console.log(data)
          var dt2 = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
          let latLong = [lat, long];
          let countryValue;
          let cityValue;
          console.log(latLong)
          switch (latLong[1]) {
            case '-64':
              countryValue = 'Argentina';
              cityValue = "Buenos Aires";
              break;
            case 2:
              countryValue = 'France';
              cityValue = "Paris";
              break;
            case 13:
              countryValue = 'Germany';
              cityValue = "Berlin";
              break;
            case 12:
              countryValue = 'Italy';
              cityValue = "Rome";
              break;
            case -120:
              countryValue = 'United States of America';
              cityValue = "Washington D.C.";
              break;
            case -3:
              countryValue = 'Spain';
              cityValue = "Madrid";
              break;
            default:
              console.log(latLong[1])
            }
          let newForecast = {
            country: countryValue,
            city: cityValue,
            date: dt2,
            feelTemp: (data[7].value[i].feels_like.day - 273.15).toFixed(1),
            temp: (data[7].value[i].temp.day - 273.15).toFixed(1),
            maxTemp: (data[7].value[i].temp.max - 273.15).toFixed(1),
            minTemp: (data[7].value[i].temp.min - 273.15).toFixed(1),
            weather: data[7].value[i].weather[0].description
          }
          console.log(newForecast)
          this.pronosticoCiudadPrincipal.push(newForecast);
        }
    });
  }

  getPronosticoCiudadSecundaria() {
    for (var i = 0; i < this.paises.length; i++){
      this.pronosticoService.getPronosticoCiudadSecundaria(this.paises[i][0]).subscribe((data)=>{
        data = Object.keys(data).map(key => ({type: key, value: data[key]}));
        this.pronosticoCiudadSecundariaData = data;
        var dt = new Date();
        var dt2 = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
        let cardCity;
        let cardCountry;
        if (this.pronosticoCiudadSecundariaData.length == 13) {
          cardCountry = this.pronosticoCiudadSecundariaData[11].value;
        } else if (this.pronosticoCiudadSecundariaData.length == 14) {
          cardCountry = this.pronosticoCiudadSecundariaData[12].value;
        };
        switch (cardCountry) {
          case 'France':
            cardCity = "Paris";
            break;
          case 'Germany':
            cardCity = "Berlin";
            break;
          case 'Italy':
            cardCity = "Rome";
            break;
          case 'United States of America':
            cardCity = "Washington D.C.";
            break;
          case 'Spain':
            cardCity = "Madrid";
            break;
        }
        let nuevoPronosticoSecundario = {
          country: cardCountry,
          city: cardCity,
          date: dt2,
          feelTemp: (this.pronosticoCiudadSecundariaData[3].value.feels_like - 273.15).toFixed(1),
          temp: (this.pronosticoCiudadSecundariaData[3].value.temp - 273.15).toFixed(1),
          maxTemp: (this.pronosticoCiudadSecundariaData[3].value.temp_max - 273.15).toFixed(1),
          minTemp: (this.pronosticoCiudadSecundariaData[3].value.temp_min - 273.15).toFixed(1),
          weather: this.pronosticoCiudadSecundariaData[1].value[0].description
        }
        console.log(this.pronosticoCiudadSecundaria)
        this.pronosticoCiudadSecundaria.push(nuevoPronosticoSecundario);
        ;
      })
    }
  }


  ngOnInit(): void {
    this.getPronosticoCiudadPrincipal('-34', '-64')
    this.getPronosticoCiudadSecundaria()
  }
}