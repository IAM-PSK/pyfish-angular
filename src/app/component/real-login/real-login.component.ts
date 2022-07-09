import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-real-login',
  templateUrl: './real-login.component.html',
  styleUrls: ['./real-login.component.css']
})
export class RealLoginComponent implements OnInit {

  tester : any;


  constructor(private router:Router,private api:ApiServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigate(['/manage'])
    }
  }

  get_user(){
    this.api.get_user().subscribe(data=>{
      console.log(data)
      this.tester = data
    })
  }

  login(login_form:string){
    this.api.login(login_form).subscribe(data=>{
      Swal.fire({
        title:"Success",
        text:"WELCOME!",
        icon:"success",
        showConfirmButton:false,
        timer:1500,
        timerProgressBar:true,
      }).then(()=>{
          let token:any = data
          localStorage.setItem('token',JSON.stringify(token))
          this.router.navigate(["/manage"])
      })
    },err =>{
      Swal.fire({
        title:"Ops!",
        text:err.error.msg,
        icon:"error",
        showConfirmButton:false,
        timer:1500,
        timerProgressBar:true,
      })
    }
    )}

}
