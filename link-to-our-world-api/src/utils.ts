
export function index<T, K extends keyof T>(elements: T[], key: K) {
    type I = T[K] extends string | number ? T[K] : never;
    const index = {} as Record<I, T>;

    for (let element of elements) {
        index[element[key] as I] = element;
    }

    return index;
}

export function sleep(time: number) {
    return new Promise( resolve => setTimeout(resolve, time))
}