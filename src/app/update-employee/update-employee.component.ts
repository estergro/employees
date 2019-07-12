import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  data: object = {};
  employees = [];
  exist = false;
  employeeObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) {}
  confirmationString: string = 'Employee updated successfully !!';
  isUpdated: boolean = false;

  updateEmployee = function(employee) {
    this.employeeObj = {
      name: employee.name,
      address: employee.address,
      tel:employee.tel
    };
    const url = `${'http://localhost:5555/employees'}/${this.id}`;
    this.http
      .put(url, JSON.stringify(this.employeeObj), { headers: this.headers })
      .toPromise()
      .then(() => {
        this.isUpdated = true;
        this.router.navigate(['/']);
      });
  };
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http
      .get('http://localhost:5555/employees')
      .subscribe((res: Response) => {
        this.employees = res.json();
        for (var i = 0; i < this.employees.length; i++) {
          if (parseInt(this.employees[i].id) === this.id) {
            this.exist = true;
            this.data = this.employees[i];
            break;
          } else {
            this.exist = false;
          }
        }
      });
  }
}
