import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../register';



@Component({
  selector: 'app-manage-privilages',
  templateUrl: './manage-privilages.component.html',
  styleUrls: ['./manage-privilages.component.css']
})
export class ManagePrivilagesComponent implements OnInit {
  public menuid;
  user:Register;
  permision:Register;
  priveilege:Register;
  userData: any = {};
  public SubMenus=[];
  public privilages=[];
  public Role_Tab_menu=[];
//  perission1=[];
 arr=[];
  constructor(private registerService: RegisterService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.showMenusData();

    var data = this.route.snapshot.paramMap.get('paramKey');
    this.userData.key = data;
    alert("id="+this.userData.key);
    this.registerService.getRolesById(this.userData).subscribe(data => {

      var z = JSON.stringify(data[1]);
      alert(z);
      this.priveilege = data[1];

      alert("privilages data"+this.priveilege);
    })
  }


  showPrivileg()
  {
    var role_name = ((document.getElementById('role') as HTMLInputElement).value);
    var role_description = ((document.getElementById('role_description') as HTMLInputElement).value);
      this.userData.roleName=role_name;
      this.userData.roleDescription=role_description;


        
    // this.registerService.editRoles(this.userData).subscribe(data => {
    //   if (data[0].code == 200) {
    //    // this.errormessage = "update successful";
    //     this.router.navigate(['user/showRole']);
    //   }

    // });
  }

  showMenusData()
  {
    this.registerService.showMenus1(this.user).subscribe((data1) =>{
      alert("get response in privioleges");
      if(data1[0].code==400){
        alert("wrong response json data");
       
      }else if(data1[0].code==200){
     
        var mydata;
     
        var userData=data1[1];
     
           this.menuid=JSON.stringify(userData[1].MENU_ID); 
           this.user=userData;
        
           var perimisionData=data1[2];
           this.permision=perimisionData;
        var arr={
          user:this.user,perimisionData:perimisionData
      }
           

           var allData=JSON.parse(JSON.stringify(arr));

           alert("permission data"+allData);
           console.log("array data"+allData);

          
  
     

        }
    })

  }
 
  myFunction() {
    var array=[];
    for(var j=0;j<2;j++){
    for(var i=0;i<3;i++){
   var checkBox = ((document.getElementById("check"+i+j) as HTMLInputElement).value);
    //var text = document.getElementById("text");
  array.push(checkBox) 
  }
}
  console.log("array",array);
}




 checkCheckBox(event) {
  if (event.target.checked) {
    var data=event.target.value;
    if(data.startsWith("sm"))
    {

      var tdata=data.split("/");
       this.SubMenus.push(tdata[1]);
    }
    else
    {
      this.privilages.push(data);
    }
   } 
}


onSubmitClk()
{
 
  

  for(var i=0;i<this.SubMenus.length;i++)
  {
    var strData="";
    var Vissible='0';
    var Edit="0";
    var Approve="0";
       for(var j=0;j<this.privilages.length;j++)
   {
      if(this.privilages[j].startsWith(this.SubMenus[i]))
      {
         
         //var pdata=this.privilages[j].split("/");
         strData=this.privilages[j]+strData;
      }
   }
   var pdata=strData.split("/");
     for(var k=0;k<pdata.length;k++)
     {
       if(pdata[k].startsWith('Vissible'))
       {
         Vissible='1';
       }
       if(pdata[k].startsWith('Edit'))
       {
        Edit='1';
       }
       if(pdata[k].startsWith('Approve'))
       {
        Approve='1';
       }
      } 

    
    this.Role_Tab_menu.push({'ROLE_ID': this.userData.key,'TAB_ID':1,'MENU_ID':this.menuid,'SUBMENU_ID':this.SubMenus[i],'EDIT':Edit,'VIEW':Vissible,'APPROVE':Approve});

  }
    alert(JSON.stringify(this.Role_Tab_menu));


    this.registerService.insertRoleTabMenu(this.Role_Tab_menu).subscribe(data=>{
    alert(data);
    });
}


}
