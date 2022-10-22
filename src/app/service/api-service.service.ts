import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { test } from './model/test';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})


export class ApiServiceService {

  use_api = true
  host_5:string = ''

  constructor(private router:Router, private http:HttpClient) {
    if(this.use_api == true){
      this.host_5 = "http://35.222.212.40/"
    }else{
      this.host_5 = "http://localhost:2499/"
    }
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
  const url = this.host_5+"user"
  return this.http.get(url,{headers:this.init()})
  }
  get_1_user(mac:string){
    const url = this.host_5+"user/"+mac
    return this.http.get(url,{headers:this.init()})
  }

  add_user(data:any){
    const url = this.host_5+"user/register"
    let body = data
    return this.http.post(url,body,{headers:this.init()})
  }

  update_user(data:any){
    const url = this.host_5+"user/"+data.mac
    console.log(data)
    console.log(url)
    return this.http.put(url,data,{headers:this.init()})
  }

  ban_user(mac:string,status:string){
    const url = this.host_5+"user/ban/"+mac
    const ban_model = {
      "status":status
    }
    return this.http.put(url,ban_model,{headers:this.init()})
  }

  getfuncwithmac(mac:string,easy:string){
    const url = this.host_5+"program/GetFormMAC/"+mac
    const mode = {
      "easy":easy
    }
    console.log(easy)
    return this.http.post(url,mode,{headers:this.init()})
  }

  getprogram(){
    const url = this.host_5+"program/"
    return this.http.get(url,{headers:this.init()})
  }

  add_rent(mac:string,data:any){
    const url = this.host_5+"rent/add"
    data.mac = mac
    console.log(data)
    return this.http.post(url,data,{headers:this.init()})
  }

  ban_rent(mac:string){
    const url = this.host_5+"rent/ban/"+mac
    console.log(url)
    return this.http.delete(url,{headers:this.init()})
  }

  get_dashboard(){
    const url = this.host_5+"login/dashboard"
    return this.http.get(url,{headers:this.init()})
  }

  banprogram(id:string,status:string){
    const url = this.host_5+"program/ban/"+id
    const status_model = {
      "status":status
    }
    return this.http.put(url,status_model,{headers:this.init()})
  }

  addprogram(name:string){
    const url = this.host_5+"program/"
    return this.http.post(url,name,{headers:this.init()})
  }

  updateprogram(id:string,name:string){
    const url = this.host_5+"program/"+id
    console.log(name)
    return this.http.put(url,name,{headers:this.init()})
  }

  get_1_program(id:string){
    const url = this.host_5+"program/update/"+id
    return this.http.get(url,{headers:this.init()})
  }

  login(data:any){
    const url = this.host_5+"login/web"
    return this.http.post(url,data)
  }

  logout(){
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

  check_token(){

    const url = this.host_5+"login/web/auth"

    return this.http.get(url,{headers:this.init()})
  }

  update_expire(){
    const url = this.host_5+"login/update_expire"
    console.log('it me')
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
