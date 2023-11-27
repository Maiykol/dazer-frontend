import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.less']
})
export class ButtonDeleteComponent implements OnInit {

  public buttonTextDefault: string = 'Delete'
  public buttonTextActive: string = 'successfully deleted!'
  public buttonText: string = this.buttonTextDefault;

  // optional; if not set, current url is copied
  @Input() path: string = '';
  @Input() buttonClasses: string = ''
  @Input() type: 'file' | 'subsample' | 'session' | 'classification' = 'file';
  @Input() filename: string = '';

  constructor(private backend: BackendService, private storage: StorageService ) { }

  ngOnInit(): void {

  }

  public async delete(event: any) {

    if (this.type === 'file') {
      const sessionId = await this.storage.get('sessionId');
      await this.backend.deleteFile(sessionId, this.filename);
    }

    this.buttonText = this.buttonTextActive;

    event.stopPropagation();
  }

}
