import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private http: Http
    ) { }
    id: number;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    employees = [];
  ngOnInit() {
   this.fetchData();
  }
  fetchData = function() {
    this.http
      .get('http://localhost:5555/employees')
      .subscribe((res: Response) => {
        this.employees = res.json();
      });
  };


  deleteEmployee = function(id) {
    if (confirm('Are you sure?')) {
      const url = `${'http://localhost:5555/employees'}/${id}`;
      return this.http
        .delete(url, { headers: this.headers })
        .toPromise()
        .then(() => {
          this.fetchData();
        });
    }
  };

}
