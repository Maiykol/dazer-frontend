import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { SubsampleResult } from '../interfaces';

@Component({
  selector: 'app-subsampling-result-parameters',
  templateUrl: './subsampling-result-parameters.component.html',
  styleUrls: ['./subsampling-result-parameters.component.less']
})
export class SubsamplingResultParametersComponent implements OnInit {

  public subsamplingId: string = '';
  @Input() set setSubsamplingId(value: string) {
    this.subsamplingId = value;
    this.init();
  }

  public subsamplingResult?: SubsampleResult;


  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  public async init() {
    // load subsampling result data
    this.subsamplingResult = await this.backend.getSubsamplingResult(this.subsamplingId);
  }

}
