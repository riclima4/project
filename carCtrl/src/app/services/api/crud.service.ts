import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Car {
  cars: [
    idCarro: number,
    idUser: number,
    nome: string,
    marca: string,
    kilometragem: string
  ];
}
export interface GasType {
  gasType: [idGasType: number, gasType: string];
}
export interface YearType {
  years: [idYear: number, year: string];
}
export interface InterventionType {
  interventionType: [idInterventionType: number, interventionType: string];
}
export interface MarcaType {
  marca: [idMarca: number, marca: string];
}
export interface ModeloType {
  modelo: [idModelo: number, idMarca: number, modelo: string];
}
export interface Intervencao {
  intervencao: [
    idIntervencao: number,
    nome: string,
    description: string,
    idCarro: number,
    idUser: number,
    data: Date,
    kilometragem: number
  ];
}
export interface Users {
  users: [idUser: number, username: string, email: string, type: number];
}

export interface RootObject {}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  url: string = environment.api_url;
  constructor(private http: HttpClient) {}

  getCars(controller: string, id: number): Observable<Car> {
    return this.http.get<Car>(`${this.url}/api/${controller}/${id}`);
  }
  getAllCars(controller: string): Observable<Car> {
    return this.http.get<Car>(`${this.url}/api/${controller}/`);
  }

  getUsers(
    controller: string,
    page: number,
    resultsCount: number
  ): Observable<Users> {
    return this.http.get<Users>(
      `${this.url}/api/${controller}?page=${page}&results=${resultsCount}`
    );
  }
  getUserCount(controller: string): Observable<Users> {
    return this.http.get<Users>(`${this.url}/api/${controller}`);
  }
  getGasType(controller: string): Observable<GasType> {
    return this.http.get<GasType>(`${this.url}/api/${controller}`);
  }
  getGasTypeTable(
    controller: string,
    page: number,
    resultsCount: number
  ): Observable<GasType> {
    return this.http.get<GasType>(
      `${this.url}/api/${controller}?page=${page}&results=${resultsCount}`
    );
  }
  getYear(controller: string): Observable<YearType> {
    return this.http.get<YearType>(`${this.url}/api/${controller}`);
  }
  getYearTable(
    controller: string,
    page: number,
    resultsCount: number
  ): Observable<YearType> {
    return this.http.get<YearType>(
      `${this.url}/api/${controller}?page=${page}&results=${resultsCount}`
    );
  }
  getInterventionType(controller: string): Observable<InterventionType> {
    return this.http.get<InterventionType>(`${this.url}/api/${controller}`);
  }
  getMarca(controller: string): Observable<MarcaType> {
    return this.http.get<MarcaType>(`${this.url}/api/${controller}`);
  }
  getMarcaTable(
    controller: string,
    page: number,
    resultsCount: number
  ): Observable<MarcaType> {
    return this.http.get<MarcaType>(
      `${this.url}/api/${controller}?page=${page}&results=${resultsCount}`
    );
  }
  getModelo(controller: string, id: number): Observable<ModeloType> {
    return this.http.get<ModeloType>(`${this.url}/api/${controller}/${id}`);
  }
  getAllModelos(controller: string): Observable<ModeloType> {
    return this.http.get<ModeloType>(`${this.url}/api/${controller}`);
  }
  getModeloTable(
    controller: string,
    page: number,
    resultsCount: number
  ): Observable<ModeloType> {
    return this.http.get<ModeloType>(
      `${this.url}/api/${controller}?page=${page}&results=${resultsCount}`
    );
  }
  getIntervencao(controller: string, id: number): Observable<Intervencao> {
    return this.http.get<Intervencao>(`${this.url}/api/${controller}/${id}`);
  }
  getIntType(
    controller: string,
    page: number,
    resultsCount: number
  ): Observable<InterventionType> {
    return this.http.get<InterventionType>(
      `${this.url}/api/${controller}?page=${page}&results=${resultsCount}`
    );
  }

  create(controller: string, model: any) {
    return this.http.post(`${this.url}/api/${controller}`, model);
  }

  delete(controller: string, id: number) {
    return this.http.delete(`${this.url}/api/${controller}/${id}`, {
      responseType: 'text',
    });
  }
  update(controller: string, id: number, model: any) {
    return this.http.put(`${this.url}/api/${controller}/${id}`, model, {
      responseType: 'text',
    });
  }
}
