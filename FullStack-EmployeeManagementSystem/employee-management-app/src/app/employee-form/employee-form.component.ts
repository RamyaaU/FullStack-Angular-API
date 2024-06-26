import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/employee';
//import the service 
import { EmployeeService } from '../employee.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  employee : Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: ''
  }

  errorMessage : string = " ";

  //inject the service in component's constructor 
  constructor(private employeeService : EmployeeService, private router : Router)
  {
  }
  
  //for the form submission this will be trigerred
  onSubmit()  : void {
    console.log(this.employee)

    //use the service method in the component 
    this.employeeService.createEmployee(this.employee)
    //subscribe((result) => console.log(result));
    .subscribe({
      //first of all subscribe is subscribing to create employee observable
      //it can execute success or error 
      next: (response) => {
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = `Error : ${err.status} - ${err.message}`;
      }
    });
  }
}
