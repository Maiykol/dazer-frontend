import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { SubsamplingDataService } from '../subsampling-data.service';

@Component({
  selector: 'app-classification-modal',
  templateUrl: './classification-modal.component.html',
  styleUrls: ['./classification-modal.component.less']
})
export class ClassificationModalComponent implements OnInit {

  constructor(private backend: BackendService) { }

  public fileColumns: string[] = [];
  public targetColumn: string = '';
  public targetColumnValues: string[] = [];
  public categoricalFileColumns: any = {};
  public filename: string = '';
  public targetColumnTargetValue: string = '';
  public subsamplingId: string = '';

  @Input() set setSubsamplingId(subsamplingId: string) {
    this.subsamplingId = subsamplingId;
    if (subsamplingId === '') {
      return
    }
    this.backend.getFileColumnsSubsampling(subsamplingId).then((response) => {

      this.fileColumns = response['columns'];
      this.categoricalFileColumns = response['categoricalColumnsValues'];

      // dropdown for target column
      $('#targetColumnDropdown').dropdown({
        onChange: (val) => {
          this.targetColumn = val;
          this.targetColumnValues = this.categoricalFileColumns[val];
        }
      });

      $('#targetValueDropdown').dropdown({
        onChange: (val) => {
          this.targetColumnTargetValue = val;
        }
      });

    });
  }

  ngOnInit(): void {

  }

  public async classificationModalSuccess() {
    const response = await this.backend.startClassificationTask(this.subsamplingId, this.targetColumn, this.targetColumnTargetValue);
    console.log(response)
  }


}
