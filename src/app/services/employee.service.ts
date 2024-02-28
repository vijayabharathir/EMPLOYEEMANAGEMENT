import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = 'https://localhost:7082/api/Empmodel';

  constructor(private http: HttpClient) {}

  
 
  postEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/AddEmployee`, emp)
  }

  getEmployee() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/GetEmployee`)
  }

  updateEmployee(emp: Employee,id:number) {
    return this.http.patch<Employee>(`${this.baseUrl}/UpdateEmployee/`+id, emp)
  }

  deleteEmployee(emp:Employee): Observable<any>{
    return this.http.delete(`${this.baseUrl}/DeleteEmployee`+ '/' + emp.id);
  }
}