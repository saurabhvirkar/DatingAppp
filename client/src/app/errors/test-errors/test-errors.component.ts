import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl='https://localhost:5001/api/';
  validationErrors : string[]=[];
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  get404Error()
  {
    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE2MjkxMDc0MjgsImV4cCI6MTYyOTcxMjIyOCwiaWF0IjoxNjI5MTA3NDI4fQ.MDU80w7khFTKEj0eC58DArgu69td1_GKNFftsMpsnfAe2Do2EwCaDfoHl7_Uj47CbmsL6Q-30hyBfwY4t_5E6Q'
    // });
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(response =>{
      //headers: httpHeaders
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get400Error()
  {
      //   const httpHeaders = new HttpHeaders({
       // 'Content-Type': 'application/json',
    //     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE2MjkxMDc0MjgsImV4cCI6MTYyOTcxMjIyOCwiaWF0IjoxNjI5MTA3NDI4fQ.MDU80w7khFTKEj0eC58DArgu69td1_GKNFftsMpsnfAe2Do2EwCaDfoHl7_Uj47CbmsL6Q-30hyBfwY4t_5E6Q'
    //   });
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(response =>{
      //headers: httpHeaders
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get500Error()
  {
    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE2MjkxMDc0MjgsImV4cCI6MTYyOTcxMjIyOCwiaWF0IjoxNjI5MTA3NDI4fQ.MDU80w7khFTKEj0eC58DArgu69td1_GKNFftsMpsnfAe2Do2EwCaDfoHl7_Uj47CbmsL6Q-30hyBfwY4t_5E6Q'
    // });
    this.http.get(this.baseUrl + 'buggy/server-error',{
      //headers: httpHeaders
    }).subscribe(response =>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get401Error()
  {
    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE2MjkxMDc0MjgsImV4cCI6MTYyOTcxMjIyOCwiaWF0IjoxNjI5MTA3NDI4fQ.MDU80w7khFTKEj0eC58DArgu69td1_GKNFftsMpsnfAe2Do2EwCaDfoHl7_Uj47CbmsL6Q-30hyBfwY4t_5E6Q'
    // });
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(response =>{
      //headers: httpHeaders
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  get400ValidationError()
   {
  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE2MjkxMDc0MjgsImV4cCI6MTYyOTcxMjIyOCwiaWF0IjoxNjI5MTA3NDI4fQ.MDU80w7khFTKEj0eC58DArgu69td1_GKNFftsMpsnfAe2Do2EwCaDfoHl7_Uj47CbmsL6Q-30hyBfwY4t_5E6Q'
  //   });
    this.http.post(this.baseUrl + 'account/register',{}).subscribe(response =>{
      //headers: httpHeaders
      console.log(response);
    },error=>{
      console.log(error);
      this.validationErrors=error;
    })
  }

}
