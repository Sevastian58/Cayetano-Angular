import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HistoriaClinica} from "../interfaces/historiaClinica";

@Injectable({providedIn: 'root'})
export class HistorialService {
  constructor(private http:HttpClient) {}

  private apiUrl:string='http://localhost:8090/historiaClinica/';

  listAll():Observable<HistoriaClinica[]>{
    const url:string = `${this.apiUrl}lista`
    return this.http.get<HistoriaClinica[]>(url);
  }

  save(historia:HistoriaClinica):Observable<HistoriaClinica>{
    const url:string=`${this.apiUrl}grabar`
    return this.http.post<HistoriaClinica>(url, historia);
  }

  update(historia:HistoriaClinica):Observable<HistoriaClinica>{
    const url:string=`${this.apiUrl}modificar`
    return this.http.put<HistoriaClinica>(url, historia);
  }

  findById(id:number):Observable<HistoriaClinica>{
    const url:string=`${this.apiUrl}buscar/${id}`;
    return this.http.get<HistoriaClinica>(url);
  }

  findByPatient(id:string):Observable<HistoriaClinica>{
    const url:string=`${this.apiUrl}buscarPorPaciente/${id}`;
    return this.http.get<HistoriaClinica>(url);
  }

}
