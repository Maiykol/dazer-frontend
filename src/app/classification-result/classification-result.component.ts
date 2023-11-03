import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { ClassificationMetric, ClassificationResult } from '../interfaces';

declare let Plotly: any;

@Component({
  selector: 'app-classification-result',
  templateUrl: './classification-result.component.html',
  styleUrls: ['./classification-result.component.less']
})
export class ClassificationResultComponent implements OnInit {

  constructor(public backend: BackendService, private route: ActivatedRoute) { }

  public classificationId: string = ''; 
  public classificationResult?: ClassificationResult;

  ngOnInit(): void {

    this.classificationId = this.route.snapshot.paramMap.get('classification') || '';

    this.backend.getClassificationResult(this.classificationId).then((result) => {

      // sort x-axis
      result.data.sort((a: any, b: any) => a.ratio - b.ratio)


      this.classificationResult = result;
      console.log(result)

      this.plotClassificationResults('f1');

      const $this = this;
      $('#metricDropdown').dropdown({
        values: [
          {
            name: 'F1',
            value: 'f1',
            selected: true
          },
          {
            name: 'Accuracy',
            value: 'accuracy'
          },
          {
            name: 'Recall',
            value: 'recall'
          },
          {
            name: 'Precision',
            value: 'precision'
          }
        ],
        onChange: function (value, text, $selectedItem) {
          $this.plotClassificationResults(value);
        }
      });

      this.plotRandomForestFeatureImportance();

    })
  }

  public plotClassificationResults(key: ClassificationMetric) {
    const trace: any = {x: [], y: [], type: 'scatter'};
    this.classificationResult?.data.forEach(datapoint => {
      trace.x.push(datapoint.ratio)
      trace.y.push(datapoint[key])
    })
    Plotly.newPlot('classificationResultPlot', [trace]);
  }

  public plotRandomForestFeatureImportance() {
    const modelNames: string[] = [];
    this.classificationResult?.data.forEach(datapoint => {
      const modelName = `ratio=${datapoint.ratio*100}%`
      if (!(modelNames.includes(modelName))) {
        modelNames.push(modelName)
      }
    })
    console.log('modelNames', modelNames)
    const data: any = [
      {
        z: this.classificationResult?.featureImportances,
        x: this.classificationResult?.features,
        y: modelNames,
        type: 'heatmap'
      }
    ];
    Plotly.newPlot('randomForestFeatureImportancesPlot', data);
  }

}
