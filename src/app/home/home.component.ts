import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productName = '';
  sweetness = 100;
  index = 4;

  imageButtons = [{ src: '/assets/img/Milk_Tea.png', name: 'ชานมเย็น' },
  { src: '/assets/img/Taro_Tea.png', name: 'ชานมเผือก' },
  { src: '/assets/img/Cantaloupe_Tea.png', name: 'ชานมแคนตาลูป' },
  { src: '/assets/img/Green_Tea.png', name: 'ชาเขียว' },
  { src: '/assets/img/Cocoa.png', name: 'โกโก้' },
  { src: '/assets/img/Coffee.png', name: 'กาแฟ' },]
  // init product img
  imageSrc = '/assets/img/Empty_.png';

  imageButtonsBB = [{ src: '/assets/img/Milk_Tea_BB.png', name: 'ชานมเย็น' },
  { src: '/assets/img/Taro_Tea_BB.png', name: 'ชานมเผือก' },
  { src: '/assets/img/Cantaloupe_Tea_BB.png', name: 'ชานมแคนตาลูป' },
  { src: '/assets/img/Green_Tea_BB.png', name: 'ชาเขียว' },
  { src: '/assets/img/Cocoa_BB.png', name: 'โกโก้' },
  { src: '/assets/img/Coffee_BB.png', name: 'กาแฟ' },]

  sweetnessImg =[{ src:'/assets/img/Sweetness_Level_1.png', sweetness:0},
  { src:'/assets/img/Sweetness_Level_2.png', sweetness:25},
  { src:'/assets/img/Sweetness_Level_3.png', sweetness:50},
  { src:'/assets/img/Sweetness_Level_4.png', sweetness:75},
  { src:'/assets/img/Sweetness_Level_5.png', sweetness:100}]
  // init sweetness img
  sugarimgSrc = this.sweetnessImg[4].src;

  constructor() { }
  ngOnInit(): void {

  }

  onClickProductBt(imageNameObject: any) {
    this.imageSrc = imageNameObject.src;
    this.productName = imageNameObject.name;
  }

  onClickBbBt(BB:string){
    if(BB === 'yes'){
      this.imageButtonsBB.forEach(obj=>{
        if(obj.name===this.productName){
          this.imageSrc = obj.src
        }
      })
    }
    else{
      this.imageButtons.forEach(obj=>{
        if(obj.name===this.productName){
          this.imageSrc = obj.src
        }
      })
    }
  }

  sweetLevel(level:string){
    if(level=='+'&&this.sweetness<=75){
      this.sweetness+=25;
      this.index+=1;
      this.sugarimgSrc=this.sweetnessImg[this.index].src;
    }
    else if(level=='-'&&this.sweetness>=25){
      this.sweetness-=25;
      this.index-=1;
      this.sugarimgSrc=this.sweetnessImg[this.index].src;
    }
    
  }

}
