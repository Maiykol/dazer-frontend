import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StorageService } from '../storage.service';
import { SubsamplingDataService } from '../subsampling-data.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-subsampling',
  templateUrl: './subsampling.component.html',
  styleUrls: ['./subsampling.component.less']
})
export class SubsamplingComponent implements OnInit {

  constructor(public backend: BackendService, public storage: StorageService, public data: SubsamplingDataService, private router: Router) { }

  public sessionId: string = '';
  public sessionFiles: string[] = [];
  public sessionFilesSubsampled: any = {};
  public fileColumns: string[] = [];
  public filename: string = '';

  async ngOnInit() {

    this.data.sessionId = this.storage.get('sessionId') || '';
    if (this.data.sessionId === '') {
      const session = await this.backend.getSessionId();
      this.data.sessionId = session['session'];
    }

    this.storage.set('sessionId', this.data.sessionId);

    // old session, load saved data
    this.backend.getSessionFiles(this.data.sessionId).then((response) => {
      console.log(response)
      this.sessionFiles = response.sessionFiles;
      this.sessionFilesSubsampled = response.subsampleData;
    });
    
  }

  public async onFileInput(fileList: any) {
    const file = fileList[0];
    if (!file.name.endsWith('.tsv')) {
      console.log('not a tsv')
      return
    }

    const result = await fetch(`http://localhost:8000/api/file_upload/${this.data.sessionId}/${file.name}`, {
      method: 'PUT',
      body: file
    }).then((response) => {
        if (this.data.sessionId === '') {
          console.log('something wrong, session should be known by now')
        }
        this.sessionFiles.unshift(file.name);
        this.openSubsampleModal(file.name);

      }).catch((response) => {
      console.log(response)
    })
  }

  public async openSubsampleModal(filename: string) {
    console.log('open modal filename', filename)
    this.filename = filename;

    $('.ui.modal').modal('show');
  }

  public openSubsamplingResult(subsampleId: string) {

    this.router.navigate(['/subsampling', subsampleId])

  }

}
