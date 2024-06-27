import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/employee';
//import the service 
import { EmployeeService } from '../employee.service';
import { response } from 'express';
import { Router, ActivatedRoute } from '@angular/router';
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

  isEditing: boolean = false;
  errorMessage : string = " ";

  //inject the service in component's constructor 
  //router is used for navigation
	//route is teh current route where the user is located right now 
  constructor(private employeeService : EmployeeService, private router : Router,
    private route :  ActivatedRoute
  )
  {
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => 
      {
        const id = result.get('id');

        if(id) 
          {
            //editing employee
            this.isEditing = true;
            console.log("Is editing");

            this.employeeService.getEmployeeById(Number(id)).subscribe
            ({
              next : (result) => this.employee = result,
              error: (err) => 
                this.errorMessage = `Error : ${err.status} - ${err.message}`
            })
          }
          else{
            //create new employee
            console.log("Is creating new");
          }
      });
  }

  //for the form submission this will be trigerred
  // onSubmit()  : void {

    

  //   console.log(this.employee)

  //   //use the service method in the component 
  //   this.employeeService.createEmployee(this.employee)
  //   //subscribe((result) => console.log(result));
  //   .subscribe({
  //     //first of all subscribe is subscribing to create employee observable
  //     //it can execute success or error 
  //     next: (response) => {
  //       this.router.navigate(['/'])
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.errorMessage = `Error : ${err.status} - ${err.message}`;
  //     }
  //   });
  // }

  onSubmit() : void {
    if(this.isEditing){
      this.employeeService.editEmployee(this.employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error occured during updating (${err.status})`;
        }
      });
    } else {
      // creating
      this.employeeService.createEmployee(this.employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error occured during creating (${err.status})`;
        }
      });
    }    
  }
}
