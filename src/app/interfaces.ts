export type StorageKeys = 'sessionId';

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
    testLabel: string,
    testRatio: string
}