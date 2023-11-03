import { Component, OnInit, Input, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { SubsamplingDataService } from '../subsampling-data.service';


@Component({
  selector: 'app-subsampling-modal',
  templateUrl: './subsampling-modal.component.html',
  styleUrls: ['./subsampling-modal.component.less']
})
export class SubsamplingModalComponent implements OnInit {

  constructor(private backend: BackendService, public data: SubsamplingDataService) { }

  public fileColumns: string[] = [];
  public targetColumn: string = '';
  public targetColumnValues: string[] = [];
  public keepRatioColumns: string[] = [];
  public categoricalFileColumns: any = {};
  public filename: string = '';
  public targetColumnTargetValue: string = '';
 
  @Input() set setFileName(filename: string) {
    if (filename === '') {
      return
    }
    this.backend.getFileColumns(this.data.sessionId, filename).then((response) => {

      this.fileColumns = response['columns'];
      this.categoricalFileColumns = response['categoricalColumnsValues'];
      this.filename = filename;

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
      
      $('#keepRatioColumnsDropdown').dropdown({
        onChange: (val) => {
            this.keepRatioColumns = val.split(',');
        }
      });
    });
  }

  ngOnInit(): void {
    
  }

  public subsampleModalSuccess() {
    this.backend.startSubsampling(this.data.sessionId, this.filename, this.keepRatioColumns, 0.2);
  }

}
