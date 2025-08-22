import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

  @ViewChild('workTitleOne') workTitleOne!: ElementRef;
  @ViewChild('bioAboutMe') bioAboutMe!: ElementRef;

  constructor() { }

  myFunctionOne() {
    this.workTitleOne.nativeElement.style.color = 'blue';
  }

  myFunctionTwo() {
    this.bioAboutMe.nativeElement.style.fontSize = '30px';
  }

  myFunctionAlert() {
    alert("Hello! This is an alert message.");
  }

}
