import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Car {
  car: [idCarro: number, nome: string, marca: string, kilometragem: string];
}

export interface Intervencao {
  intervencao: [
    idIntervencao: number,
    nome: string,
    description: string,
    idCarro: number,
    data: Date,
    km: number
  ];
}

export interface Users {
  users: [
    NIF: number,
    nome: string,
    marca: string,
    matricula: string,
    kilometragem: string
  ];
}

export interface RootObject {}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  url: string = environment.api_url;
  constructor(private http: HttpClient) {}

  getCars(controller: string): Observable<Car> {
    return this.http.get<Car>(`${this.url}/api/${controller}`);
  }

  // getPex(controller : string): Observable<Pex> {
  //   return this.http.get<Pex>(`${this.url}/api/${controller}`);
  // }

  // getPS(controller : string): Observable<PS> {
  //   return this.http.get<PS>(`${this.url}/api/${controller}`);
  // }

  // getOskills(controller : string): Observable<Oskills> {
  //   return this.http.get<Oskills>(`${this.url}/api/${controller}`);
  // }

  // getRA(controller : string): Observable<RA> {
  //   return this.http.get<RA>(`${this.url}/api/${controller}`);
  // }

  // getProjects(controller : string): Observable<Projects> {
  //   return this.http.get<Projects>(`${this.url}/api/${controller}`);
  //   }

  // getFutureProjects(controller : string): Observable<FP> {
  // return this.http.get<FP>(`${this.url}/api/${controller}`);
  // }

  // create(controller: string, model: any) {
  //   return this.http.post(`${this.url}/api/${controller}`, model);
  // }

  //   delete(controller: string, id: number) {
  //     return this.http.delete(`${this.url}/api/${controller}/${id}`,{responseType:"text"});
  //   }
}
