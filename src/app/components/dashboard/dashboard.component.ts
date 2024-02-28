import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild('exampleModal') modal: any; 
  @ViewChild('tabsContainer')
  tabsContainer!: ElementRef;
empDetail!:FormGroup;
empObj:Employee=new Employee();
empList : Employee[] = [];

educationOptions = [
  '10th pass',
  'diploma',
  'graduate',
  'PhD',
];

showinsert!:boolean;
showupdate!:boolean;
constructor(private fb:FormBuilder,private empService:EmployeeService, private modalService: NgbModal ) { 

}

  ngOnInit(): void {
   this.getEmployee();

     this.empDetail=this.fb.group({
    
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      birthdate:['', Validators.required],
      gender:['', Validators.required],
      education:['', Validators.required],
      company:['', Validators.required],
      jobexperience:['', Validators.required],
      salary:['', Validators.required],
      street:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      phone:['',[Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)]],
      email:['', [Validators.required,Validators.email]]
    });
}
add()
{this.showinsert=true;
  this .showupdate=false;}


addEmployee():void {

    
this.empObj.firstname=this.empDetail.value.firstname;
this.empObj.lastname=this.empDetail.value.lastname;
this.empObj.birthdate=this.empDetail.value.birthdate;
this.empObj.gender=this.empDetail.value.gender;
this.empObj.education=this.empDetail.value.education;
this.empObj.company=this.empDetail.value.company;
this.empObj.jobexperience=+this.empDetail.value.jobexperience;
this.empObj.salary=+this.empDetail.value.salary;
this.empObj.street=this.empDetail.value.street;
this.empObj.city=this.empDetail.value.city;
this.empObj.state=this.empDetail.value.state;
this.empObj.phone=this.empDetail.value.phone;
this.empObj.email=this.empDetail.value.email;
if(this.empDetail.valid){
this.empService.postEmployee(this.empObj).subscribe(res=>{
  console.log(res);
  this.dismissModal();
  this.getEmployee();
 this.empDetail.reset();
 alert("Added Successfully");
  }, (error) => {
    console.error(error);
  });
}else{
  this.validateAllFormFields(this.empDetail)
  
}

  }
 
  dismissModal() :void{
    console.log('Trying to dismiss modal...');
  
    if (this.modalService) {
      this.modalService.dismissAll(); console.log('Modal dismissed successfully.');
    } else {
      console.error('Modal service not available.');
    
    } }

  getEmployee() {
    this.empService.getEmployee().subscribe(res=>{
        this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editEmployee(emp: Employee) {
    this.showinsert=false;
    this.showupdate=true;
  
      this.empObj.id = emp.id;
    
    this.empDetail.setValue({
      firstname: emp.firstname,
      lastname: emp.lastname,
      birthdate: emp.birthdate,
      gender: emp.gender,
      education: emp.education,
      company: emp.company,
      jobexperience: emp.jobexperience,
      salary: emp.salary,
      street: emp.street,
      city: emp.city,
      state: emp.state,
      phone: emp.phone,
      email: emp.email
    });
  }

  updateEmployee() {
   
    this.empObj.firstname=this.empDetail.value.firstname;
this.empObj.lastname=this.empDetail.value.lastname;
this.empObj.birthdate=this.empDetail.value.birthdate;
this.empObj.gender=this.empDetail.value.gender;
this.empObj.education=this.empDetail.value.education;
this.empObj.company=this.empDetail.value.company;
this.empObj.jobexperience=+this.empDetail.value.jobexperience;
this.empObj.salary=+this.empDetail.value.salary;
this.empObj.street=this.empDetail.value.street;
this.empObj.city=this.empDetail.value.city;
this.empObj.state=this.empDetail.value.state;
this.empObj.phone=this.empDetail.value.phone;
this.empObj.email=this.empDetail.value.email;
 
    this.empService.updateEmployee(this.empObj,this.empObj.id).subscribe(res=>{
      this.empDetail.reset();
      this.getEmployee();
     
    },err=>{
      console.log(err);
    });
  
   
  }

  deleteEmployee(emp : Employee) {

    this.empService.deleteEmployee(emp).subscribe(res=>{
      console.log(res);
      alert('Employee deleted successfully');
      this.getEmployee();
    },err => {
      console.log(err);
    });

  }

  resetForm() {
    this.empDetail.reset(); 
    const firstTabLink = this.tabsContainer.nativeElement.querySelector('a.nav-link:first-child');
  if (firstTabLink) {
    firstTabLink.click();
  }
  }

  private validateAllFormFields(formGroup: FormGroup):void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }});
      
    
    }
}