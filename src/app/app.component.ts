import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './services/api-data.service'; // Import the service where you want to use it
import { Subscription } from 'rxjs';

// Mock data (check tsconfig.json)
import states from './data/state-list.json';

// Models
import { Posts } from './models/Posts';
import { States } from './models/States';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  // the subscription that will listen to changes in our "database"
  posts$: Subscription;
  // the information we want to provide to our template
  data: Posts[];
  // the information we want to provide to our template
  states: States[];
  // FormGroup
  smallForm: FormGroup;

  get titlesValue() {
    return this.smallForm.controls.titles.value;
  }

  get statesValue() {
    return this.smallForm.controls.states.value;
  }

  constructor(private posts: DataService, private fb: FormBuilder) {  }

  ngOnInit(): void {
    // set our states proeperty to the mock data coming from the internal json file
    this.states = states;

    // use the posts service to get our posts
    this.posts$ = this.posts.getData(`posts`)
      .subscribe((data: Posts[]) => {
        this.data = data;
      });

    this.createSmallForm();
  }

  createSmallForm() {
    this.smallForm = this.fb.group({
      titles: ['', Validators.required],
      states: ['', Validators.required],
    });
    console.log(this.smallForm);
  }

  ngOnDestroy(): void {
    this.posts$.unsubscribe();
  }

}
