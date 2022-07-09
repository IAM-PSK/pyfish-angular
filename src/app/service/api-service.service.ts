import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { test } from './model/test';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {



  constructor(private router:Router, private http:HttpClient) {

  }



  init(){
    const token:any = localStorage.getItem("token")
    const token_a = JSON.parse(token)
    const headers = new HttpHeaders({
      'x-access-token':token_a.token,
    })
    return headers;
  }

  get_user(){
  const url = "http://localhost:2499/user"
  return this.http.get(url,{headers:this.init()})
  }
  get_1_user(mac:string){
    const url = "http://localhost:2499/user/"+mac
    return this.http.get(url,{headers:this.init()})
  }

  add_user(data:any){
    const url = "http://localhost:2499/user/register"
    let body = data
    return this.http.post(url,body,{headers:this.init()})
  }

  update_user(data:any){
    const url = "http://localhost:2499/user/"+data.mac
    console.log(data)
    console.log(url)
    return this.http.put(url,data,{headers:this.init()})
  }

  ban_user(mac:string,status:string){
    const url = "http://localhost:2499/user/ban/"+mac
    const ban_model = {
      "status":status
    }
    return this.http.put(url,ban_model,{headers:this.init()})
  }

  login(data:any){
    const url = "http://localhost:2499/login/web"
    return this.http.post(url,data)
  }

  logout(){
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

  check_token(){

    const url = "http://localhost:2499/login/web/auth"

    return this.http.get(url,{headers:this.init()})
  }

    async info_alert(title:string,text:string,icon:string,show_but:boolean,time:number,bar:boolean){
    let res:any
    Swal.fire({
      title:"Success",
      text:"WELCOME!",
      icon:"success",
      showConfirmButton:false,
      timer:1500,
      timerProgressBar:true,
    }).then((result)=>{
       res = result
    })
    return res
  }

}
