import { Component, OnInit, Input, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { SubsamplingDataService } from '../subsampling-data.service';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-subsampling-modal',
  templateUrl: './subsampling-modal.component.html',
  styleUrls: ['./subsampling-modal.component.less']
})
export class SubsamplingModalComponent implements OnInit {

  constructor(private backend: BackendService, public data: SubsamplingDataService, private storage: StorageService) { }

  public fileColumns: string[] = [];
  public targetColumn: string = '';
  public targetColumnValues: string[] = [];
  public keepRatioColumns: string[] = [];
  public categoricalFileColumns: any = {};
  public filename: string = '';
  public targetColumnTargetValue: string = '';
  public testRatio: number = 0.2;
  public ratios: number[] = [0.25, 0.5, 0.75, 1];
  public nRatios: number = 4; // user input for number of subsamples
  public nRandomStates: number = 1; // user input for number of random states
  public crossValidationK: number = 2;
  public allowedDeviation: number = 0.2;
 
  private async setFileName(filename: string) {
    if (filename === '') {
      return
    }
    const sessionId = await this.storage.get('sessionId');
    this.backend.getFileColumns(sessionId, filename).then((response) => {

      this.fileColumns = response['columns'];
      this.categoricalFileColumns = response['categoricalColumnsValues'];
      this.filename = filename;

      const keepRatioColumnsValues: any[] = [];
      this.fileColumns.forEach(col => {
        keepRatioColumnsValues.push(
          {
            name: col,
            value: col
          },
        )
      })
      $('#subsampling_modal #keepRatioColumnsDropdown').dropdown({
        values: keepRatioColumnsValues,
        onChange: (val) => {
            this.keepRatioColumns = val.split(',');
        }
      });

      $('#subsampling_modal .ui.dropdown#ratioInput')
        .dropdown({
          values: [
            {
              name: '2',
              value: '2'
            },
            {
              name: '4',
              value: '4',
              selected: true
            },
            {
              name: '5',
              value: '5'
            },
            {
              name: '10',
              value: '10'
            },
            {
              name: '20',
              value: '20'
            }
          ]
        });

      $('#subsampling_modal .ui.dropdown#randomStatesInput')
        .dropdown({
          values: [
            {
              name: '1',
              value: '1',
              selected: true
            },
            {
              name: '2',
              value: '2'
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
            }
          ]
        });
    });

    $('#subsampling_modal').modal('show');

  }

  ngOnInit(): void {

    $('#subsampling_modal .ui.accordion')
      .accordion()
      ;

    this.data.subsamplingModalFilename$.subscribe(filename => {
      this.setFileName(filename);
    })

  }

  public async subsampleModalSuccess() {
    const sessionId = await this.storage.get('sessionId');
    this.backend.startSubsampling(sessionId, this.filename, this.keepRatioColumns, this.testRatio, this.ratios, this.nRandomStates, this.allowedDeviation);
  }

  public setRatioInput() {
    const ratios = [];
    const ratioSingle = 1 / this.nRatios;
    let ratioCurrent = 0;
    while (ratioCurrent <= 1) {
      if (ratioCurrent > 0) {
        ratios.push(ratioCurrent);
      }
      ratioCurrent = Math.round((ratioCurrent + ratioSingle) * 100)/100;
    }
    this.ratios = ratios;
  }

}
