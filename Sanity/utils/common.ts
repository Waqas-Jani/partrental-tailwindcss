export function findDuplicates(arr: any[]) {
    return new Set(arr.map((v) => v._type)).size !== arr.length;
}

export function findObject(arr: any[], type: string) {
    return arr.find((item) => item._type === type);
}
