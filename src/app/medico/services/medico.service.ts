import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../interfaces/medico';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MedicoService {

  constructor(private http:HttpClient) { }

  private apiUrl:string = 'http://localhost:8090/medico/';


  searchById(id:string):Observable<Medico>{
    const url = `${this.apiUrl}buscar/${id}`
    return this.http.get<Medico>(url)
  }

  listByEspecialidad(especialidad:string):Observable<Medico[]>{
    const url = `${this.apiUrl}listaEspecialidad/${especialidad}`
    return this.http.get<Medico[]>(url)
  }

  listAll():Observable<Medico[]>{
    const url = `${this.apiUrl}lista`
    return this.http.get<Medico[]>(url)
  }

  save(med:Medico):Observable<Medico>{
    const url = `${this.apiUrl}grabar`
    return this.http.post<Medico>(url, med)
  }

  update(med:Medico):Observable<Medico>{
    const url = `${this.apiUrl}actualizar`
    return this.http.put<Medico>(url, med)
  }

  /*deleteById(id:string):Observable<Medico>{
    const url = `${this.apiUrl}eliminar/${id}`
    return this.http.delete<Medico>(url)
  }*/
}
