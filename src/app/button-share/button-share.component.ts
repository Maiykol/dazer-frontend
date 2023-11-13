import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-share',
  templateUrl: './button-share.component.html',
  styleUrls: ['./button-share.component.less']
})
export class ButtonShareComponent implements OnInit {

  public buttonTextDefault: string = 'Copy the link'
  public buttonTextActive: string = 'Link copied!'
  public buttonText: string = this.buttonTextDefault;

  // optional; if not set, current url is copied
  @Input() path: string = '';
  @Input() buttonClasses: string = ''

  constructor() { }

  ngOnInit(): void {

  }

  public copyUrlToClipboard(event: any) {
    if (this.path.length) {
      navigator.clipboard.writeText(`${window.location.origin}/${this.path}`);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    this.buttonText = this.buttonTextActive;
    setTimeout(() => {
      this.buttonText = this.buttonTextDefault;
    }, 1000)

    event.stopPropagation();
  }

}
