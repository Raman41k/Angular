import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICar} from "../../interfaces";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input()
  car:ICar

  @Output()
  carForUpdate = new EventEmitter<ICar>();

  @Output()
  carForDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  update():void {
    this.carForUpdate.emit(this.car)
  }

  delete():void {
    this.carForDelete.emit(this.car.id);
  }
}
