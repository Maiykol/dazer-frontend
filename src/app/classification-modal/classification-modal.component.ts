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
  public crossValidationK: number = 2;
  public nRandomStates: number = 1;

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

    $('.ui.accordion')
      .accordion()
      ;

    $('.ui.dropdown#crossValidationK')
      .dropdown({
        values: [
          {
            name: '1',
            value: '1'
          },
          {
            name: '2',
            value: '2',
            selected: true
          },
          {
            name: '3',
            value: '3'
          },
          {
            name: '4',
            value: '4',
          },
          {
            name: '5',
            value: '5'
          },
          {
            name: '6',
            value: '6'
          },
          {
            name: '7',
            value: '7'
          },
          {
            name: '8',
            value: '8'
          },
          {
            name: '9',
            value: '9'
          },
          {
            name: '10',
            value: '10'
          }
        ]
      });

  }

  public async classificationModalSuccess() {
    const response = await this.backend.startClassificationTask(this.subsamplingId, this.targetColumn, this.targetColumnTargetValue, this.crossValidationK, this.nRandomStates);
  }


}
