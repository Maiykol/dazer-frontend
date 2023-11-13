import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { SubsampleResult } from '../interfaces';
declare let Plotly: any;


@Component({
  selector: 'app-subsampling-result-plots',
  templateUrl: './subsampling-result-plots.component.html',
  styleUrls: ['./subsampling-result-plots.component.less']
})
export class SubsamplingResultPlotsComponent implements OnInit {

  public subsamplingId: string = '';
  @Input() set setSubsamplingId(value: string) {
    this.subsamplingId = value;
    this.init();
  }

  constructor(private backend: BackendService, private cd: ChangeDetectorRef) { }

  public subsamplingResult!: SubsampleResult;
  public containerRows: { [key: string]: string[]; } = {};
  public containerCols: string[] = [];
  public barplotSharedYAxis = false;
  private maxCountsPerCategory: { [key: string]: number } = {};
  private columns: string[] = [];
  private categoricalColumnsValues: any = {};

  private barplotLayout: any = {
    title: false,
    autosize: true,
    height: 350,
    margin: {
      l: 25,
      r: 25,
      b: 50,
      t: 20,
      pad: 0,
      autoexpand: true
    }
  };


  async ngOnInit() {
    $('.message .close').on('click', function () {
      $(this).closest('.message').transition('fade');
    });
  }

  public async init() {
    // load subsampling result data
    this.subsamplingResult = await this.backend.getSubsamplingResult(this.subsamplingId);

    // columns header
    this.subsamplingResult.ratios.sort().forEach((ratio: string) => {
      this.containerCols.push(`${Number(ratio) * 100}`);
    });
    this.containerCols.push(`test ${Number(this.subsamplingResult.testRatio) * 100}`);

    for (const [category, categoryData] of Object.entries(this.subsamplingResult.data)) {
      this.containerRows[category] = [];
      for (const ratio of this.subsamplingResult.ratios as string[]) {
        const ratioData = categoryData[ratio];
        const plotDiv = `${category}_${ratio}`;
        this.containerRows[category].push(plotDiv)
      }
      // test data
      const ratio = this.subsamplingResult.testLabel;
      const ratioData = categoryData[ratio];
      const plotDiv = `${category}_${ratio}`;
      this.containerRows[category].push(plotDiv)
    }
    this.cd.detectChanges();

    for (const [category, categoryData] of Object.entries(this.subsamplingResult.data)) {
      for (const ratio of this.subsamplingResult.ratios as string[]) {
        const ratioData = categoryData[ratio];
        const plotDiv = `${category}_${ratio}`;
        this.plotBar(ratio, plotDiv, Object.keys(ratioData), Object.values(ratioData))
        if (ratio === '1') {
          this.maxCountsPerCategory[category] = Math.max(...Object.values(ratioData));
        }
      }
      // show the test data
      const ratio = this.subsamplingResult.testLabel;
      const ratioData = categoryData[ratio];
      const plotDiv = `${category}_${ratio}`;
      this.plotBar(ratio, plotDiv, Object.keys(ratioData), Object.values(ratioData))
    }


    $('.ui.sticky')
      .sticky({
        context: '#barplotContainer'
      })
      ;

    $('.popup')
      .popup()
      ;

    this.toggleBarplotShareYlim();
  }

  public formatTestColLabel(label: string) {
    const value = label.split(' ').pop();
    return value
  }

  public plotBar(title: string, plotDiv: string, x: string[], y: number[]) {
    title = title.toString(); // in case it is a number
    const trace: any = {
      x: x,
      y: y,
      type: 'bar',
    };

    if (title.includes('test')) {
      trace['marker'] = {
        color: '#c44e52'
      }
    }

    const config = { responsive: true, displayModeBar: false }

    Plotly.newPlot(plotDiv, [trace], this.barplotLayout, config);
  }

  public toggleBarplotShareYlim() {
    if (this.barplotSharedYAxis) {
      this.barplotLayout.yaxis = {
        range: null,
      }
      for (const [category, plotContainer] of Object.entries(this.containerRows)) {
        plotContainer.forEach(plotId => {
          Plotly.redraw(plotId);
        })
      }
    } else {
      for (const [category, max_value] of Object.entries(this.maxCountsPerCategory)) {
        this.barplotLayout.yaxis = {
          range: [0, max_value],
        }
        this.containerRows[category].forEach(plotId => {
          Plotly.redraw(plotId);
        })
      }
    }
    this.barplotSharedYAxis = !this.barplotSharedYAxis;
  }

}
