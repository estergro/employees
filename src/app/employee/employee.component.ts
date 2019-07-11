import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: Http
    ) { }
    confirmationString: string = 'New Employee has been Added !!';
    isAdded: boolean = false;
    employeeObj: object = [];

    addNewEmployee = function(employee) {
      this.employeeObj = {
        id: employee.p_id,
        name: employee.p_name,
        address: employee.address,
        tel:employee.tel

      };
      this.http
        .post('http://localhost:5555/employees/', this.employeeObj)
        .subscribe((res: Response) => {
          this.isAdded = true;
        });
        
    };

  ngOnInit() {

  }

}
