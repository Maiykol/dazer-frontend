import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsampleResult } from '../interfaces';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-subsampling-result',
  templateUrl: './subsampling-result.component.html',
  styleUrls: ['./subsampling-result.component.less']
})
export class SubsamplingResultComponent implements OnInit {


  constructor(private route: ActivatedRoute, private backend: BackendService) { }

  public subsamplingId: string = '';
  public subsamplingResult!: SubsampleResult;
  public containerRows: { [key: string]: string[]; } = {};
  public containerCols: string[] = [];
  public barplotSharedYAxis = false;
  public file: any = {};

  async ngOnInit() {

    this.subsamplingId = this.route.snapshot.paramMap.get('subsampling')  || '';
    this.backend.getFile(this.subsamplingId).then(response => {
      this.file = response.file
    });

  }

  public async openClassificationeModal() {
    $('#classification_modal.ui.modal').modal('show');
  }

}
