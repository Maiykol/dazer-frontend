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
  public sessionFiles: any = {};
  public fileColumns: string[] = [];
  public filename: string = '';

  async ngOnInit() {

    this.sessionId = await this.storage.get('sessionId');

    this.storage.set('sessionId', this.sessionId);
    // old session, load saved data
    this.backend.getSessionFiles(this.sessionId).then((response) => {
      this.sessionFiles = response.sessionFiles;
    });
    
  }

  public async onFileInput(fileList: any) {
    const file = fileList[0];
    if (!file.name.endsWith('.tsv')) {
      console.log('not a tsv')
      return
    }

    let filename = file.name;
    // check if filename exists
    const attempts = 1000;
    let attempt = 1;
    while (this.sessionFiles.find((e: { filename: any; }) => e.filename === filename)) {
      filename = file.name.replace('.tsv', `${attempt}.tsv`);
      attempt ++;
      if (attempt > attempts) {
        alert('Filename already taken!')
        return
      }
    }

    const result = await fetch(`http://localhost:8000/api/file_upload/${this.sessionId}/${filename}`, {
      method: 'PUT',
      body: file
    }).then((response) => {
      // todo
      }).catch((response) => {
      console.log(response)
    })
  }

  public openSubsamplingResult(subsampleId: string) {

    this.router.navigate(['/subsampling', subsampleId])

  }

}
