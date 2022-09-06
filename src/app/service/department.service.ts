import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  DepartmentUrl: string="";

  constructor(private http:HttpClient) {
    this.DepartmentUrl='http://localhost:44337/department';
   }
   
   getAllDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.DepartmentUrl);
  }
  
  addDepartment(department:Department):Observable<Department>{
    //alert("values: "+department.companyName+", "+department.departmentName);
    return this.http.post<Department>(this.DepartmentUrl,department);
  }

  updateDepartment(department:Department):Observable<Department>{
    return this.http.put<Department>(this.DepartmentUrl+'/'+department.id,department);
  }

  deleteDepartment(department:Department) : Observable<Department> {
    return this.http.delete<Department>(this.DepartmentUrl+'/'+department.id);
  }
}
