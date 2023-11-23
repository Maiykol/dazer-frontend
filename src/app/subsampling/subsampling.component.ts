import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StorageService } from '../storage.service';
import { SubsamplingDataService } from '../subsampling-data.service';
import {Router} from "@angular/router"
import { environment } from 'src/environments/environment';


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
  public fileUploadingFlag = false;

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
      // @ts-ignore
      $.toast({
        position: 'top center',
        title: 'Error while uploading file!',
        class: 'center aligned error',
        className: {
          toast: 'ui message'
        },
        showProgress: 'bottom',
        classProgress: 'red',
        // progressUp: true,
        displayTime: 5000,
        message: `The selected file is not a .tsv file. Please make sure it has the correct format.`
      });
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

    this.fileUploadingFlag = true;
    const result = await fetch(`${environment.API}file_upload/${this.sessionId}/${filename}`, {
      method: 'PUT',
      body: file
    }).then((response) => {
      // @ts-ignore
      $.toast({
        position: 'top center',
        title: 'File uploaded',
        class: 'center aligned success',
        className: {
          toast: 'ui message'
        },
        showProgress: 'bottom',
        classProgress: 'green',
        // progressUp: true,
        displayTime: 5000,
        message: `Your file has beed upladed. You can always find it in the file menu if you want to delete it or use it later again..`
      });
      // refresh file menu
      this.data.fileMenuRefreshFlag = true;
      // TODO start analysis modal

      }).catch((response) => {
      console.log(response)
    }).finally(() => {
      this.fileUploadingFlag = false;
    })
  }

  public openSubsamplingResult(subsampleId: string) {

    this.router.navigate(['/subsampling', subsampleId])

  }

}
