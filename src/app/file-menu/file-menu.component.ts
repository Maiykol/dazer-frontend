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

  constructor(private backend: BackendService, public storage: StorageService, private data: SubsamplingDataService) { }

  async ngOnInit() {

    // old session, load saved data
    this.sessionId = await this.storage.get('sessionId');

    this.data.fileMenuRefreshFlag$.subscribe(flag => {
      if (flag) {
        this.loadSessionFiles();
      }
    })

    // initially
    this.loadSessionFiles();
  }

  private loadSessionFiles() {
    this.backend.getSessionFiles(this.sessionId).then((response) => {
      this.sessionFiles = response.sessionFiles;
      setTimeout(() => {
        $('#fileMenu .progress').progress();
      }, 500)
    });
  }

}
