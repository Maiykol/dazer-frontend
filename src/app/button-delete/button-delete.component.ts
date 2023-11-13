import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.less']
})
export class ButtonDeleteComponent implements OnInit {

  public buttonTextDefault: string = 'Delete'
  public buttonTextActive: string = 'successfully deleted!'
  public buttonText: string = this.buttonTextDefault;

  // optional; if not set, current url is copied
  @Input() path: string = '';
  @Input() buttonClasses: string = ''

  constructor(private backend: BackendService) { }

  ngOnInit(): void {

  }

  public delete(event: any) {

    // delete TODO
    // this.backend.....

    this.buttonText = this.buttonTextActive;

    event.stopPropagation();
  }

}
