import { Routes } from '@angular/router';
//IMPORT THE NECESSARY ROUTES
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
    //will redirect to home / root component
    {path: '', component : EmployeeTableComponent},
    //if given create in url then it will redirect to create component of employee form
    {path: 'create', component: EmployeeFormComponent},
    {path: 'edit/:id', component: EmployeeFormComponent},
    //if given employees in url then it will redirect to root / home component 
    {path: 'employees', redirectTo: '', pathMatch:'full'}
];


