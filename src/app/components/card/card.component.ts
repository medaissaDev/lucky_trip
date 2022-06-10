import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() destination = {
    image_url: null,
    city: '',
    country_name: '',
    id: null,
  };
  constructor() {}

  ngOnInit(): void {}
}
