import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { paciente } from '../interfaces/paciente';

@Injectable({providedIn: 'root'})
export class PacienteService {
  constructor(private http: HttpClient) { }

  private apiUrl:string = 'http://localhost:8090/paciente/'

  searchById(id:string):Observable<paciente>{
    const url = `${this.apiUrl}buscar/${id}`
    return this.http.get<paciente>(url)
  }

  listByName(name:string):Observable<paciente[]>{
    const url = `${this.apiUrl}buscarByName/${name}`
    return this.http.get<paciente[]>(url)
  }

  listAll():Observable<paciente[]>{
    const url = `${this.apiUrl}lista`
    return this.http.get<paciente[]>(url)
  }

  registrar(pac:paciente):Observable<paciente>{
    const url = `${this.apiUrl}grabar`
    return this.http.post<paciente>(url, pac)
  }

  modificar(pac:paciente):Observable<paciente>{
    const url = `${this.apiUrl}actualizar`
    return this.http.put<paciente>(url, pac)
  }

}
