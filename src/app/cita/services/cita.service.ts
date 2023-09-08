import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../interfaces/cita';

@Injectable({providedIn: 'root'})
export class CitaService {
  constructor(private http:HttpClient) { }

  private apiUrl:string = 'http://localhost:8090/cita/';


  listAll():Observable<Cita[]>{
    const url= `${this.apiUrl}lista`
    return this.http.get<Cita[]>(url)
  }

  save(cita:Cita):Observable<Cita>{
    const url = `${this.apiUrl}grabar`
    return this.http.post<Cita>(url, cita)
  }


  listCreate(codEspe:number, numSala:string, codMed:string, fecha:string):Observable<Cita[]>{
    const url=`${this.apiUrl}listaCreate?codEspe=${codEspe}&numSala=${numSala}&codMed=${codMed}&fecha=${fecha}`
    return this.http.get<Cita[]>(url);
  }
}
