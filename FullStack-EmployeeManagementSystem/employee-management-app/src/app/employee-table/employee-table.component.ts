import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../employee.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})

export class EmployeeTableComponent {

  employees: Employee[] = [];

  constructor(private employeeService : EmployeeService) {}

  //ngOnInit - a lifecycle hook - will be called once the component has been initialized 
  ngOnInit() {

    //calling service method 
    this.employeeService.getEmployees()
    
    //SUBSCRIBE - it is a method that listens to data from observables 
    //so here subscribe wants to listen the data from Employees 
    .subscribe(
      
      //the function inside subscribe runs when the data arrives 
      (data : Employee[]) => {

        // once the data arrives, put it in teh employees property
      this.employees = data;
      console.log(data);

    });

    // ngOnInit() {
    //   // Step 1: Tell the service to get the employee data
    //   this.employeeService.getEmployees().subscribe((data: Employee[]) => {
    //     // Step 2: When the data arrives, put it into the `employees` property
    //     this.employees = data;
    //   });
    // }
  }
}
