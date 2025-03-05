export function difference<T>(a: T[], b: T[]) {
    const c: T[] = []
    for (let aElement of a) {
        if (!b.includes(aElement)) c.push(aElement);
    }
    return c;
}