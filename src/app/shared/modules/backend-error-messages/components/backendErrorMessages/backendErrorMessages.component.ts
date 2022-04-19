import { Component, Input, OnInit } from '@angular/core';
import { BackEndErrorsInterface } from './../../../../types/backEndErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('backendErrors') backendErrorsProps: BackEndErrorsInterface;
  errorMessages!: string[];
  constructor() {}

  ngOnInit() {
    this.errorMessages = Object.keys(this.backendErrorsProps)
      .map((name: string) => {
    const messages = this.backendErrorsProps[name].join('');
    return `${name} ${messages}`;
    });
  }


}
