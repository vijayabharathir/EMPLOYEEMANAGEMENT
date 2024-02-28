export class Employee {
  id: number = 0;
  firstname: string = '';
  lastname: string = '';
  birthdate: string = '';
  gender: string = '';
  education: string = '';
  company: string = '';
  jobexperience: number = 0;
  salary: number = 0;
  profile: string = '';
  street:  string = '';
  city: string = '';
  state:  string= '' ;
  phone: string= '';
  email: string='';

  [key: string]: number | string | undefined;
}