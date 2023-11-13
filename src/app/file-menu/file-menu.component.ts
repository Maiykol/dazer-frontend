import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { SubsamplingDataService } from '../subsampling-data.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.less']
})
export class FileMenuComponent implements OnInit {

  public sessionFiles: any = [];
  public sessionId: string = '';

  constructor(private backend: BackendService, public storage: StorageService) { }

  async ngOnInit() {

    // old session, load saved data
    this.sessionId = await this.storage.get('sessionId');
    this.backend.getSessionFiles(this.sessionId).then((response) => {
      this.sessionFiles = response.sessionFiles;

      setTimeout(() => {
        console.log($('#fileMenu .progress'))
        $('#fileMenu .progress').progress();
      }, 1000)
    });


  }

}
