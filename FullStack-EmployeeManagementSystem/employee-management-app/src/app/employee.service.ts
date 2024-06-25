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

}
