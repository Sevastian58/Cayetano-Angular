import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../interfaces/cita';

@Injectable({providedIn: 'root'})
export class SalaService {
  constructor(private http:HttpClient) {
   }
   private apiUrl:string = 'http://localhost:8090/sala/';

   listByEspe(especialidad:number):Observable<Sala[]>{
     const url= `${this.apiUrl}byEspecialidad/${especialidad}`
     return this.http.get<Sala[]>(url)
   }
}
