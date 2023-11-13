import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-show',
  templateUrl: './button-show.component.html',
  styleUrls: ['./button-show.component.less']
})
export class ButtonShowComponent implements OnInit {

  public buttonText: string = 'Show';

  // optional; if not set, current url is copied
  @Input() path: string = '';
  @Input() buttonClasses: string = ''

  constructor() { }

  ngOnInit(): void {

  }

  public delete(event: any) {

    // delete TODO
    // this.backend.....

    event.stopPropagation();
  }
}
