export type StorageKeys = 'sessionId';

export interface SessionResponse {
    session: string,
}

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
    iterationRandomStates: number[],
    allowedDeviation: number
}

export interface ClassificationResult {
    status: string,
    progress: number,

    dataMerged: {
        nSamplesTrain: number,
        nSamplesTest: number,
        accuracy: number,
        f1: number,
        precision: number,
        recall: number,
        TNR: number,
        randomState: number,
        randomStateSubsampleIteration: number,
        ratio: number,
        nFn: number,
        nTn: number,
        nFp: number,
        nTp: number,
        tp: number,
        fp: number,
        tn: number,
        fn: number,
    }[],
    data: {
        nSamplesTrain: number,
        nSamplesTest: number,
        accuracy: number,
        f1: number,
        precision: number,
        recall: number,
        TNR: number,
        randomState: number,
        randomStateSubsampleIteration: number,
        ratio: number,
        nFn: number,
        nTn: number,
        nFp: number,
        nTp: number,
        tp: number,
        fp: number,
        tn: number,
        fn: number,
    }[],
    featureImportances: number[][],
    featureImportancesFeatures: string[],
    modelNames: string[],
    filename: string,
    targetColumn: string,
    targetValue: string,
    crossValidationK: number,
    randomStates: number[]
}