import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../../interfaces/category.interface';
import * as luxon from 'luxon';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  skips: ICategory[] = [
    {
      name: 'micro',
      description: 'skips Micro breaks',
    },
    {
      name: 'normal',
      description: 'skips Normal breaks',
    },
  ];
  skip: ICategory = {} as ICategory;

  currentSkipName!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.queryParams;
    this.currentSkipName = +id === 0 ? 'normal' : 'micro';
    this.skip = this.skips.find((s) => s.name === this.currentSkipName)!;
    this.generateForm();
  }

  generateForm(): void {
    const currentDefaultValue = localStorage.getItem(this.currentSkipName)
      ? JSON.parse(localStorage.getItem(this.currentSkipName)!)
      : true;
    const skipsDefaultValue = localStorage.getItem(
      `${this.currentSkipName}Skips`
    )
      ? JSON.parse(localStorage.getItem(`${this.currentSkipName}Skips`)!)
      : 2;
    const timerDefaultValue = localStorage.getItem(
      `${this.currentSkipName}Timer`
    )
      ? JSON.parse(localStorage.getItem(`${this.currentSkipName}Timer`)!)
      : this.currentSkipName === 'micro'
      ? 30
      : 60;

    this.form.addControl(
      this.currentSkipName,
      new FormControl(currentDefaultValue)
    );
    this.form.addControl(
      `${this.currentSkipName}Skips`,
      new FormControl(skipsDefaultValue)
    );
    this.form.addControl(
      `${this.currentSkipName}Timer`,
      new FormControl(this.formatTime(timerDefaultValue))
    );
  }

  formatTime(minutes: number): string {
    const m = minutes % 60;
    const h = (minutes - m) / 60;
    return (
      h.toString().padStart(2, '0') +
      ':' +
      (m < 10 ? '0' : '') +
      m.toString().padStart(2, '0')
    );
  }

  save(): void {}
}
