import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 1,
    centeredSlides: false
  }

  constructor() { }

  ngOnInit() {
  }

}
