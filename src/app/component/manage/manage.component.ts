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
  page:any
  p:any
  mode:any='true'
  all_program:any = ''
  mac:any = ''
  program:any =''
  test:string = ''
  isLoggedin:any
  user_info:any
  update_user_info:any
  tester = 'ss'
  dateOne = new Date(2016, 0, 1);
  day:string = '1'
  function_id = '1'
  rent_price = '0'
  dashboard:any
  program_input:any
  program_input_name:any

  constructor(private fb:FormBuilder, private api:ApiServiceService, private router:Router) {

  }

  ngOnInit(): void {
    this.getdashboard()
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

set_day(day:string){
  this.day = day
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

get_program(mac:string,easy:string){
  this.mode = easy
  this.api.getfuncwithmac(mac,this.mode).subscribe(data=>{
    this.program = data
  })
}

add_rent(mac:string,data:any){
  if((data.hours_of_rent == '' || data.function_id == '') || data.rent_price == ''){
    Swal.fire({
      title:"กรุณากรอกข้อมูลให้ครบถ้วน",
      icon:"error",
      timerProgressBar:true,
      timer:1500,
      showConfirmButton:false
    })
    return
  }
  console.log(data)
  this.api.add_rent(mac,data).subscribe(data=>{
    Swal.fire({
      title:"สำเร็จ",
      icon:"success",
      showConfirmButton:false,
      timer:1500,
      timerProgressBar:true,
    })
    this.get_program(this.mac.mac,'true')
  })
}

ban_rent(mac:string){
  Swal.fire({
    title:"คุณต้องการระงับการใช้งานหรือไม่",
    text:"คุณจะไม่สามารถย้อนคืนการกระทำได้",
    showCancelButton:true,
    icon:"question",
    focusCancel:true,
    confirmButtonColor:"red",
    confirmButtonText:"ตกลง",
    cancelButtonText:"ยกเลิก"
  }).then(result=>{
    if(result.isConfirmed){
      this.api.ban_rent(mac).subscribe(data=>{
        Swal.fire({
          title:"สำเร็จ",
          text:"ระงับการใช้งานสำเร็จ",
          icon:"success",
          timerProgressBar:true,
          timer:1500,
          showConfirmButton:false
        })
        this.get_program(this.mac.mac,'true')
      })


    }
  })

}

getprogram(){
  this.api.getprogram().subscribe(data=>{
    this.all_program = data
  })
}

get_1_program(id:string){
  this.api.get_1_program(id).subscribe(data=>{
    this.program_input = data
    this.program_input_name = this.program_input[0].function_name
  })
}

getdashboard(){
  this.api.get_dashboard().subscribe(data=>{
    this.dashboard = data
  })
}

addprogram(data:any){
  if(data.name == '' ){
    Swal.fire('กรุณากรอกข้อมูลให้ครบ','','error')
    return
  }
  this.api.addprogram(data).subscribe(data=>{
    Swal.fire({
      title:"สำเร็จ",
      icon:"success",
      showConfirmButton:false,
      timer:1500,
      timerProgressBar:true,
    })
    this.getprogram()
  })
}

banprogram(function_id:string,status:string){
  if(status == '1'){
    status = '0'
  }else{
    status = '1'
  }

  Swal.fire({
    title:"คุณจะสลับสถานะการใช้งานหรือไม่",
    showCancelButton:true,
    icon:"question",
    focusCancel:true,
    confirmButtonColor:"red",
    confirmButtonText:"ตกลง",
    cancelButtonText:"ยกเลิก"
  }).then(result=>{
    if(result.isConfirmed){
      this.api.banprogram(function_id,status).subscribe(data=>{
        Swal.fire({
          title:"สำเร็จ",
          text:"ระงับการใช้งานสำเร็จ",
          icon:"success",
          timerProgressBar:true,
          timer:1500,
          showConfirmButton:false
        })
        this.getprogram()
      })


    }
  })



}

updateprogram(function_id:string,name:string){

  this.api.updateprogram(function_id,name).subscribe(data=>{
    Swal.fire({
      title:"สำเร็จ",
      icon:"success",
      showConfirmButton:false,
      timer:1500,
      timerProgressBar:true,
    })
    this.getprogram()
  })

}

logout(){
  this.api.logout()
}

rent_form_init(){
  this.day = '1'
  this.function_id = '1'
  this.rent_price = '0'
  this.get_program(this.mac.mac,'true')
}

}
