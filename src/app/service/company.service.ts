import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  CompanyURL: string="";

  constructor(private http:HttpClient) {
    this.CompanyURL='http://localhost:47212/Company';
   }

   addCompany(company:Company):Observable<Company>{
    return this.http.post<Company>(this.CompanyURL,company);
  }

  getAllCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(this.CompanyURL);
  }

  updateCompany(company:Company):Observable<Company>{
    return this.http.put<Company>(this.CompanyURL+'/'+company.id,company);
  }

  deleteCompany(company:Company) : Observable<Company> {
    return this.http.delete<Company>(this.CompanyURL+'/'+company.id);
  }
}
