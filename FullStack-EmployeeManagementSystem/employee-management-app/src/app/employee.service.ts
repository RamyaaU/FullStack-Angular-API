import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

                    //base url
  private apiUrl = `${environment.apiUrl}/employee` 

  //the http client is injected for the service to make http requests
  constructor(private http : HttpClient) { }

  //method sends a GET request to the API endpoint and
  //returns an observable of the employee data
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
  }

  getEmployeeById(id : number) : Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  //a parameter employee is passed to take all the employee details
  ////returns an Observable that allows you to handle the server's response when the employee is successfully created
  createEmployee(employee: Employee): Observable<Employee>
  {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  //id is the parameter and void beacuse - observable does not emit any bvalue 
  //when delete request is successful
  deleteEmployee(id: number) : Observable<void>
  {
    //ex url - https://api.example.com/employees/123 hence the literals are used 
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editEmployee(employee: Employee) : Observable <Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }
}
