import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ClassificationResult } from '../interfaces';

@Component({
  selector: 'app-classification-result-parameters',
  templateUrl: './classification-result-parameters.component.html',
  styleUrls: ['./classification-result-parameters.component.less']
})
export class ClassificationResultParametersComponent implements OnInit {

  public classificationId: string = '';
  @Input() set setClassifcationId(value: string) {
    this.classificationId = value;
    this.init();
  }

  public classificationResult?: ClassificationResult;


  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  public async init() {
    // load subsampling result data
    this.classificationResult = await this.backend.getClassificationResult(this.classificationId);
    console.log(this.classificationResult)
  }

}
