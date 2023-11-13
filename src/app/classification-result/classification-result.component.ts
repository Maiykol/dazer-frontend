import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { ClassificationMetric, ClassificationResult } from '../interfaces';

declare let Plotly: any;

@Component({
    selector: 'app-classification-result',
    templateUrl: './classification-result.component.html',
    styleUrls: ['./classification-result.component.less'],
})
export class ClassificationResultComponent implements OnInit {
    constructor(
        public backend: BackendService,
        private route: ActivatedRoute
    ) {}

    public subsamplingId: string = '';
    public classificationId: string = '';
    public classificationResult?: ClassificationResult;
    public bestCaseNumber: number = 3;
    public defaultCaseNumber: number = 1;
    public mergeIterationsPerformances = true;

    public classificationMetric: ClassificationMetric = 'f1';

    ngOnInit(): void {
        this.subsamplingId =
            this.route.snapshot.paramMap.get('subsampling') || '';
        this.classificationId =
            this.route.snapshot.paramMap.get('classification') || '';

        this.init();
    }

    public init() {
      this.backend
        .getClassificationResult(this.classificationId)
        .then(result => {
          this.classificationResult = result;

          if (this.classificationResult!.data === undefined) {
            // task not yet finished, only progress is returned from API
            this.initProgress();
          } else {
            this.initPlots();
          }
        });
    }

    public initProgress() {
      console.log('initprogress')
      console.log(this.classificationResult!.progress * 100)
      $('#progressBar').progress({
        // @ts-ignore
        percent: this.classificationResult!.progress * 100,
        // @ts-ignore
        text: {
          active: this.classificationResult!.status,
          success: 'Done!'
        }
      });

    }

    public initPlots(){

      console.log('init plots')

      // sort x-axis
      this.classificationResult!.data.sort((a: any, b: any) => a.ratio - b.ratio);

      const $this = this;
      $('#metricDropdown').dropdown({
        values: [
          {
            name: 'F1',
            value: 'f1',
            selected: true,
          },
          {
            name: 'Accuracy',
            value: 'accuracy',
          },
          {
            name: 'Recall',
            value: 'recall',
          },
          {
            name: 'Precision',
            value: 'precision',
          },
        ],
        onChange: function (value, text, $selectedItem) {
          $this.classificationMetric = value;
          $this.plotClassificationResults();
        },
      });

      this.plotClassificationResults();

      this.plotRandomForestFeatureImportance();

      this.plotImpactEstimation();

      $('.message .close').on('click', function () {
        $(this).closest('.message').transition('fade');
      });
    }


    public plotImpactEstimation() {
        const traces: { [key: string]: any } = {
            random: {
                x: [],
                y: [],
                mode: 'lines+markers',
                type: 'scatter',
                name: 'random',
            },
            real: {
                x: [],
                y: [],
                mode: 'lines+markers',
                type: 'scatter',
                name: 'RandomForest',
            },
        };
        this.classificationResult?.dataMerged.forEach(datapoint => {
            traces['real'].x.push(datapoint.ratio);
            traces['real'].y.push(
                (datapoint.nTp * this.bestCaseNumber +
                    datapoint.nFn * this.defaultCaseNumber) /
                    (datapoint.nTp + datapoint.nFn)
            );

            // random model
            traces['random'].x.push(datapoint.ratio);
            traces['random'].y.push(
                (((datapoint.nTp + datapoint.nFn) / 2) * this.bestCaseNumber +
                    ((datapoint.nTp + datapoint.nFn) / 2) *
                        this.defaultCaseNumber) /
                    (datapoint.nTp + datapoint.nFn)
            );
        });
        var layout = {
            xaxis: {
                title: 'data ratio',
            },
            yaxis: {
                title: 'impact difference per sample',
            },
        };
        Plotly.newPlot('impactEstimationPlot', Object.values(traces), layout);
    }

    public plotClassificationResults() {
        let data = [];
        const trace: any = { x: [], y: [], type: 'scatter' };
        if (this.mergeIterationsPerformances) {
            this.classificationResult?.dataMerged.forEach(datapoint => {
                trace.x.push(datapoint.ratio);
                trace.y.push(datapoint[this.classificationMetric]);
            });
            data = [trace];
        } else {
            // merge results of different subsample data based on ratio for each model random state
            const mergedSubsampleResults: any = {};
            const ratios: Set<number> = new Set(); // for the order of the ratios (x-axis)

            const traces: any = {};
            this.classificationResult?.randomStates.forEach(rs => {
                traces[rs] = JSON.parse(JSON.stringify(trace)); // classic deep copy in js again
                traces[rs].name = `Random State: ${rs}`;
                mergedSubsampleResults[rs] = {};
            });
            this.classificationResult?.data.forEach(datapoint => {
                if (
                    mergedSubsampleResults[datapoint.randomState][
                        datapoint.ratio
                    ] === undefined
                ) {
                    mergedSubsampleResults[datapoint.randomState][
                        datapoint.ratio
                    ] = [];
                }
                mergedSubsampleResults[datapoint.randomState][
                    datapoint.ratio
                ].push(datapoint[this.classificationMetric]);
                ratios.add(datapoint.ratio);
            });
            const ratiosSorted = Array.from(ratios).sort(
                (a: number, b: number) => {
                    return a - b;
                }
            );

            Object.entries(mergedSubsampleResults).forEach(
                ([rs, ratioData]: any) => {
                    ratiosSorted.forEach((ratio: number) => {
                        const values = ratioData[ratio];
                        traces[rs].x.push(ratio);
                        traces[rs].y.push(
                            values.reduce((a: number, b: number) => a + b, 0) /
                                values.length
                        );
                    });
                }
            );
            data = Object.values(traces);
        }
        var layout = {
            xaxis: {
                title: 'data ratio',
            },
            yaxis: {
                title: this.classificationMetric,
            },
        };
        Plotly.newPlot('classificationResultPlot', data, layout);
    }

    public plotRandomForestFeatureImportance() {
        const modelNames: string[] = [];
        this.classificationResult?.dataMerged.forEach(datapoint => {
            const modelName = `ratio=${datapoint.ratio * 100}%`;
            if (!modelNames.includes(modelName)) {
                modelNames.push(modelName);
            }
        });
        const data: any = [
            {
                z: this.classificationResult?.featureImportances,
                x: this.classificationResult?.featureImportancesFeatures,
                y: modelNames,
                type: 'heatmap',
            },
        ];
        Plotly.newPlot('randomForestFeatureImportancesPlot', data);
    }
}
