import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('withdraw','false');
  }
  setWithDraw(screen:string)
  {
    if(screen!='portfolio')
    {
      localStorage.setItem('withdraw','false');
      localStorage.setItem('list','false');
    }
    else{
      localStorage.setItem('withdraw','true');
      localStorage.setItem('list','true');
    }
  }
}
