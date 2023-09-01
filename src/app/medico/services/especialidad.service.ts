import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/medico';

@Injectable({providedIn: 'root'})
export class EspecialidadService {
  constructor(private http:HttpClient) { }

  private apiUrl:string ="http://localhost:8090/especialidad/";

  listAll():Observable<Especialidad[]>{
    const url= `${this.apiUrl}lista`;
    return this.http.get<Especialidad[]>(url);
  }
}
