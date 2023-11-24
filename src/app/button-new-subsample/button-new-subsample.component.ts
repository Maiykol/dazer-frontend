import { Component, Input, OnInit } from '@angular/core';
import { SubsamplingDataService } from '../subsampling-data.service';

@Component({
  selector: 'app-button-new-subsample',
  templateUrl: './button-new-subsample.component.html',
  styleUrls: ['./button-new-subsample.component.less']
})
export class ButtonNewSubsampleComponent implements OnInit {

  public buttonText: string = 'Sample';

  // optional; if not set, current url is copied
  @Input() filename: string = '';
  @Input() buttonClasses: string = ''

  public modalFilename = '';

  constructor(public data: SubsamplingDataService) { }

  ngOnInit(): void {

  }

  public openSubsampleModal(event: any) {
    console.log('click')
    this.data.subsamplingModalFilename = this.filename;
    event.stopPropagation();
  }

}
