import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { th } from 'date-fns/esm/locale';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  public customPatterns = { '0': { pattern: new RegExp('\[A-Z0-9\]')} };
  mac:any = ''
  test:string = ''
  isLoggedin:any
  user_info:any
  update_user_info:any
  tester = 'ss'
  dateOne = new Date(2016, 0, 1);



  constructor(private fb:FormBuilder, private api:ApiServiceService, private router:Router) {

  }

  ngOnInit(): void {
    this.api.check_token().subscribe(data=>{
    this.isLoggedin = data
    this.get_user()

    },err=>{
      if(err.status == 401 || err.status == 403){
        Swal.fire('อุ๊บ!','มีบางอย่างผิดพลาด กรุณาเข้าสู่ระบบอีกครั้ง','error')
        localStorage.clear();
        sessionStorage.clear()
        this.router.navigate(['/'])
      }
    })
  }

get_user(){
  this.api.get_user().subscribe(data=>{
    this.user_info = data
  })
}

get_1_user(mac:string){
  this.api.get_1_user(mac).subscribe(data=>{
    this.update_user_info = data
    const update_model = {
      "mac":this.update_user_info[0].user_mac,
      "name":this.update_user_info[0].user_name,
      "status":this.update_user_info[0].user_status,
      "lastlogin":this.update_user_info[0].user_last_login,
    }
    this.mac = update_model
  })
}

add_user(add_form:any){
  
  if(add_form.mac == '' || add_form.name == ''){
    Swal.fire({
      title:"กรุณากรอกข้อมูลให้ครบถ้วน",
      icon:"error",
      timerProgressBar:true,
      timer:1500,
      showConfirmButton:false
    })
    return
  }

  this.api.add_user(add_form).subscribe(data=>{
    this.router.navigate(['/manage'])
    this.get_user()
    Swal.fire({
      title:"สำเร็จ",
      text:"เพิ่มข้อมูลสำเร็จแล้ว",
      icon:"success",
      timerProgressBar:true,
      timer:1500,
      showConfirmButton:false
    })
  },err=>{
    console.log(err)
    Swal.fire({
      title:"อุ๊ป มีบางอย่างผิดพลาด",
      icon:"error",
      timerProgressBar:true,
      timer:1500,
      showConfirmButton:false
    })
  })

}

update_user(update_form:any){

  if(update_form.mac == ''){
    update_form.mac = this.mac.mac
    console.log(this.mac.mac)
  }
  if(update_form.name == ''){
    update_form.name = this.mac.name
  }

  this.api.update_user(update_form).subscribe(data=>{
    console.log(data)
    this.get_user()
    Swal.fire({
      title:"สำเร็จ",
      text:"อัปเดตสำเร็จ",
      icon:"success",
      timerProgressBar:true,
      timer:1500,
      showConfirmButton:false
    })
  },err=>{
    Swal.fire({
      title:"อุ๊ป มีบางอย่างผิดพลาด",
      icon:"error",
      timerProgressBar:true,
      timer:1500,
      showConfirmButton:false
    })
  })
}

ban_user(mac:string,status:string){

  let swal_message_question:string
  let swal_message_ans:string

  if(status == '1'){
    status = '0'
    swal_message_question = 'คุณต้องการระงับการใช้งาน ('
    swal_message_ans = "ระงับการใช้งานสำเร็จ"
  }else{
    status = '1'
    swal_message_question = 'คุณต้องการหยุดระงับการใช้งาน ('
    swal_message_ans = "หยุดระงับการใช้งานสำเร็จ"
  }

  Swal.fire({
    title:"คุณแน่ใจหรือไม่",
    text:swal_message_question+mac+") หรือไม่",
    showCancelButton:true,
    icon:"question",
    focusCancel:true,
    confirmButtonColor:"red",
    confirmButtonText:"ตกลง",
    cancelButtonText:"ยกเลิก"
  }).then(result=>{
    if(result.isConfirmed){
      this.api.ban_user(mac,status).subscribe(data=>{
        Swal.fire({
          title:"สำเร็จ",
          text:swal_message_ans,
          icon:"success",
          timerProgressBar:true,
          timer:1500,
          showConfirmButton:false
        })
        this.get_user()
      },err=>{
        Swal.fire({
          title:"อุ๊ป มีบางอย่างผิดพลาด",
          icon:"error",
          timerProgressBar:true,
          timer:1500,
          showConfirmButton:false
        })
      })
    }
  })


}

logout(){
  this.api.logout()
}

}
