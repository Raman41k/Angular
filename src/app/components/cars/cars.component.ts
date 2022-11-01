import {Component, OnInit} from '@angular/core';

import {ICar} from "../../interfaces";
import {CarService} from "../../services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: ICar[];
  form: FormGroup;
  updateCar: ICar | null;

  constructor(private carService: CarService) {
    this._initForm()
  }

  ngOnInit(): void {
    this.carService.getAll().subscribe(value => this.cars = value)
  }

  _initForm():void{
    this.form = new FormGroup({
      model: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
      price: new FormControl(
        null,[
          Validators.required,
          Validators.max(1000000),
          Validators.min(1)
        ]),
      year: new FormControl(
        null,[
          Validators.required,
          Validators.max(new Date().getFullYear()),
          Validators.min(1800)
        ]),
    })
  }

  submit():void {
    if (!this.updateCar) {
      this.carService.create(this.form.value).subscribe(value => {
        this.cars.push(value)
      })
    } else {
      this.carService.updateById(this.updateCar.id, this.form.value).subscribe(value => {
        const car = this.cars.find(car => car.id === this.updateCar?.id);
        Object.assign(car!, value);
        this.updateCar = null;
      })
    }
    this.form.reset();
  }

  lift(car: ICar) {
    this.updateCar = car
    this.form.setValue({
      model: car.model,
      price: car.price,
      year: car.year,
    })
  }

  deleteById(id: number) {
    this.carService.deleteById(id).subscribe(()=> {
      const index = this.cars.findIndex(car=>car.id === id);
      this.cars.slice(index, 1)
    })
  }
}
