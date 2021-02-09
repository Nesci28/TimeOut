import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ICategory } from '../../../../interfaces/category.interface';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['./settings-general.component.scss'],
})
export class SettingsGeneralComponent implements OnInit {
  form: FormGroup = new FormGroup({
    quotes: new FormControl(''),
    inspire: new FormControl(''),
    management: new FormControl(''),
    sports: new FormControl(''),
    life: new FormControl(''),
    funny: new FormControl(''),
    love: new FormControl(''),
    art: new FormControl(''),
    students: new FormControl(''),
    skips: new FormControl(''),
    micro: new FormControl(''),
    microSkips: new FormControl(0),
    normal: new FormControl(''),
    normalSkips: new FormControl(0),
  });

  categories: ICategory[] = [
    {
      name: 'inspire',
      description: 'Inspiring Quote of the day',
    },
    {
      name: 'management',
      description: 'Management Quote of the day',
    },
    {
      name: 'sports',
      description: 'Sports Quote of the day',
    },
    {
      name: 'life',
      description: 'Quote of the day about life',
    },
    {
      name: 'funny',
      description: 'Funny Quote of the day',
    },
    {
      name: 'love',
      description: 'Quote of the day about Love',
    },
    {
      name: 'art',
      description: 'Art quote of the day ',
    },
    {
      name: 'students',
      description: 'Quote of the day for students',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    Object.keys(this.form.controls).forEach((c) => {
      const defaultValue = c.includes('Skips') ? 2 : true;
      const value = localStorage.getItem(c)
        ? JSON.parse(localStorage.getItem(c)!)
        : defaultValue;
      this.form.get(c)?.setValue(value);
      this.form.get(c)?.updateValueAndValidity();
    });
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }
    Object.keys(this.form.controls).forEach((c) => {
      localStorage.setItem(c, this.form.get(c)!.value);
    });
  }
}
