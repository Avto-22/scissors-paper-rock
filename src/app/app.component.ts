import { Component } from '@angular/core';
import { delay } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scissors-paper-rock';

  userValue:string;

  compValue:string;

  winnerText:string;

  isLoading:boolean=true;

  userPoint:number=0;

  computerPoint:number=0;

  valueArr:Array<string>=['rock','scissor','paper'];

  userImg:string="../assets/images/rock-user.png";

  computerImg:string="../assets/images/rock-computer.png";

  constructor() { }

   loadImages(){
    of('').pipe(delay(300)).subscribe(()=>{ // მოქმედებების ჩატვირთვა
      this.computerImg=`./assets/images/${this.compValue}-computer.png`;
      this.userImg=`./assets/images/${this.userValue}-user.png`;
      (document.getElementsByClassName('game-board')[0] as HTMLElement).style.opacity="0";
      this.isLoading=false; 
    });
  }

  makeLoadSynch(){
    setTimeout(()=>{ // მოქმედებების ერთდროულად გამოჩენა
      (document.getElementsByClassName('game-board')[0] as HTMLElement).style.opacity="1";
      let oldUserPoint=this.userPoint;
      let oldComputerPoint=this.computerPoint;
      if(this.userValue==this.compValue){
        this.winnerText="You Tied!";
      }
      if(this.userValue=='rock' && this.compValue=='scissor'){
        this.userPoint+=1;
      }
      if(this.userValue=='scissor' && this.compValue=='rock'){
        this.computerPoint+=1;
      }
      if(this.userValue=='rock' && this.compValue=='paper'){
        this.computerPoint+=1;
      }
      if(this.userValue=='paper' && this.compValue=='rock'){
        this.userPoint+=1;
      }
      if(this.userValue=='scissor' && this.compValue=='paper'){
        this.userPoint+=1;
      }
      if(this.userValue=='paper' && this.compValue=='scissor'){
        this.computerPoint+=1;
      }
      if(this.userPoint>oldUserPoint){
        this.winnerText="You Win!";
      }
      if(this.computerPoint>oldComputerPoint){
        this.winnerText="Computer Win!";
      }
    },700);
  }
  
  getWinner(userValue:string){
    this.winnerText="";
    this.isLoading=true;
    let index=Math.floor(Math.random() * 3);
    this.compValue=this.valueArr[index];
    this.userValue=userValue;
    this.loadImages();
    this.makeLoadSynch();
  }

}
