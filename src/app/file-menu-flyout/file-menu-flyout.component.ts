import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-file-menu-flyout',
    templateUrl: './file-menu-flyout.component.html',
    styleUrls: ['./file-menu-flyout.component.less'],
})
export class FileMenuFlyoutComponent implements OnInit {

    @Input() set toggle(flag: number) {
        if (flag > 0) {
            // @ts-ignore
          $('#sidebarFileMenu')
            .sidebar('toggle')
            ;
        }
    }

    constructor() {}

    ngOnInit(): void {}
}
