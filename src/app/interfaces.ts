export type StorageKeys = 'sessionId';

export type ClassificationMetric = 'accuracy' | 'f1' | 'precision' | 'recall';

export interface SubsampleResult {
    ratios: string[],
    keepRatioColumns: string[],
    filename: string,
    data: {
        [key: string] : {
            [key: string]: {
                [key: string]: number
            }
        }
    },
    testLabel: string, // label to identify test dataset
    testRatio: string, // ratio of test dataset to complete dataset
    columns: string[],
    categoricalColumnsValues: {[key: string]: string[]}, // keys are the columns, values are the possible values in the column 
}

export interface ClassificationResult {
    data: {
        nSamplesTrain: number,
        nSamplesTest: number,
        accuracy: number,
        f1: number,
        precision: number,
        recall: number,
        TNR: number,
        randomState: number,
        randomStateData: number,
        ratio: number
    }[],
    featureImportances: number[][],
    features: string[],
    modelNames: string[],
    filename: string,
    targetColumn: string,
    targetValue: string
}