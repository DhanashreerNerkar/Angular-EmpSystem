import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'; //dhn added
import { Company } from 'src/app/model/company';
import { Department } from 'src/app/model/department';
import { CompanyService } from 'src/app/service/company.service';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  companyDetail!:FormGroup; //dhn added
  companyObj:Company=new Company();
  companyList:Company[]=[];

  departmentDetail!:FormGroup; //dhn added
  departmentObj:Department=new Department();
  departmentList:Department[]=[];
 
  constructor(private formBuilder: FormBuilder,private _companyService:CompanyService,private _departmentService:DepartmentService) { }

  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllDepartments();

    this.companyDetail=this.formBuilder.group({
      ID:[''],
      Name:[''],
      EstalishmentYear:[''],
      ContactNumber:[''],
      CompanyEmail:[''],
      Website:[''],
      AddressLine1:[''],
      AddressLine2:[''],
      Country:[''],
      State:[''],
      City:[''],
      ZipCode:['']
    });

    this.departmentDetail=this.formBuilder.group({
      ID:[''],
      CompanyName:[''],
      DepartmentName:['']
    });
  }

  getAllCompanies()
    {
      this._companyService.getAllCompanies().subscribe(res=>{
        this.companyList=res;
      },err=>{
        console.log("Error while fetching company list");
      });
    }

  addCompany()
    {
      this.companyObj.name=this.companyDetail.value.Name;
      this.companyObj.establishedYear=this.companyDetail.value.EstalishmentYear;
      this.companyObj.contactNumber=this.companyDetail.value.ContactNumber;
      this.companyObj.companyEmail=this.companyDetail.value.CompanyEmail;
      this.companyObj.website=this.companyDetail.value.Website;
      this.companyObj.addressLine1=this.companyDetail.value.AddressLine1;
      this.companyObj.addressLine2=this.companyDetail.value.AddressLine2;
      this.companyObj.country=this.companyDetail.value.Country;
      this.companyObj.state=this.companyDetail.value.State;
      this.companyObj.city=this.companyDetail.value.City;
      this.companyObj.zipCode=this.companyDetail.value.ZipCode;

      this._companyService.addCompany(this.companyObj).subscribe(res=>{
        this.getAllCompanies();
      },err=>{
        console.log(err);
      });
    }

    
    editCompany(company:Company)
    {
      this.companyDetail.controls['ID'].setValue(company.id);
      this.companyDetail.controls['Name'].setValue(company.name);
      this.companyDetail.controls['EstalishmentYear'].setValue(company.establishedYear);
      this.companyDetail.controls['ContactNumber'].setValue(company.contactNumber);
      this.companyDetail.controls['CompanyEmail'].setValue(company.companyEmail);
      this.companyDetail.controls['Website'].setValue(company.website);
      this.companyDetail.controls['AddressLine1'].setValue(company.addressLine1);
      this.companyDetail.controls['AddressLine2'].setValue(company.addressLine2);
      this.companyDetail.controls['Country'].setValue(company.country);
      this.companyDetail.controls['State'].setValue(company.state);
      this.companyDetail.controls['City'].setValue(company.city);
      this.companyDetail.controls['ZipCode'].setValue(company.zipCode);
    }
    
    updateCompany() {
      this.companyObj.id = this.companyDetail.value.ID;
      this.companyObj.name = this.companyDetail.value.Name;
      this.companyObj.establishedYear = this.companyDetail.value.EstalishmentYear;
      this.companyObj.contactNumber = this.companyDetail.value.ContactNumber;
      this.companyObj.companyEmail = this.companyDetail.value.CompanyEmail;
      this.companyObj.website = this.companyDetail.value.Website;
      this.companyObj.addressLine1 = this.companyDetail.value.AddressLine1;
      this.companyObj.addressLine2 = this.companyDetail.value.AddressLine2;
      this.companyObj.country = this.companyDetail.value.Country;
      this.companyObj.state = this.companyDetail.value.State;
      this.companyObj.city = this.companyDetail.value.City;
      this.companyObj.zipCode = this.companyDetail.value.ZipCode;
  
      this._companyService.updateCompany(this.companyObj).subscribe(res=>{
        console.log(res);
        this.getAllCompanies();
      },err=>{
        console.log(err);
      })
  
    }

    deleteCompany(company : Company) 
    {
      this._companyService.deleteCompany(company).subscribe(res=>{
      },err => {
        console.log(err);
      });
     const i = this.companyList.findIndex(e => e.id === company.id);
       if (i !== -1) {
        this.companyList.splice(i, 1);       
        console.log(this.companyList);
        alert("Record deleted successfully");
      }
    }

    getAllDepartments()
    {
      this._departmentService.getAllDepartments().subscribe(res=>{
      this.departmentList=res; 
    },err=>{
      console.log("Error while fetching department list");
    });
  }

  addDepartment()
  {
    alert("this.departmentDetail.value.companyName= "+this.departmentDetail.value.CompanyName+", "+"this.departmentDetail.value.departmentName: "+this.departmentDetail.value.DepartmentName);
    
    this.departmentObj.companyName=this.departmentDetail.value.CompanyName;
    this.departmentObj.departmentName=this.departmentDetail.value.DepartmentName;
   
   {alert(this.departmentObj.companyName+", "+this.departmentObj.departmentName);}
 
    this._departmentService.addDepartment(this.departmentObj).subscribe(res=>{
       console.log(res);
       this.getAllDepartments();
     },err=>{
       console.log(err);
     });
  }

  editDepartment(department:Department)
  {
    this.departmentDetail.controls['ID'].setValue(department.id);
    this.departmentDetail.controls['CompanyName'].setValue(department.companyName);
    this.departmentDetail.controls['DepartmentName'].setValue(department.departmentName);
  }

  updateDepartment() {
    this.departmentObj.id = this.departmentDetail.value.ID;
    this.departmentObj.companyName = this.departmentDetail.value.CompanyName;
    this.departmentObj.departmentName = this.departmentDetail.value.DepartmentName;
   alert(this.departmentObj.id+", "+ this.departmentObj.companyName+", "+ this.departmentObj.departmentName);
    this._departmentService.updateDepartment(this.departmentObj).subscribe(res=>{
      console.log(res);
      this.getAllDepartments();
    },err=>{
      console.log(err);
    })
  }

  deleteDepartment(department:Department)
  {
    this._departmentService.deleteDepartment(department).subscribe(res=>{
         
    },err => {
       console.log(err);
    });
    const i = this.companyList.findIndex(e => e.id === department.id);
    if (i !== -1) {
     this.departmentList.splice(i, 1);       
     console.log(this.departmentList);
     alert("Record deleted successfully");
   }
  }
}
