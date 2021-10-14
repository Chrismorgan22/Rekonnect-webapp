import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.scss']
})
export class PersonalizationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  moveToNextModal(currentModal, nextModal) {
    $('#' + currentModal).addClass('fade');
    $('#' + nextModal).removeClass('fade');
    $('#' + nextModal).css('display', 'block');
    $('#' + currentModal).css('display','none');
  }
  moveToPreviousModal(currentModal, prevModal) {
    $('#' + currentModal).addClass('fade');
    $('#' + prevModal).removeClass('fade');
    $('#' + currentModal).css('display','none');
    // $('#' + prevModal).css('display', 'block');
  }
}
