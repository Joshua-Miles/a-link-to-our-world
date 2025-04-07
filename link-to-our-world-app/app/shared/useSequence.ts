import { useEffect, useState } from "react";

type Options = {
    hasStarted: boolean
    onFinished?: () => any
}

type HasOptions<T> = {
    reached?: T;
    notReached?: T;
    passed?: T;
    notPassed?: T
}

export function useSequence<T extends string>({ hasStarted, onFinished }: Options, segments: T[]) {
    const [ currentIndex, setCurrentIndex ] = useState<null | number>(null)

    const numberOfSegments = segments.length;

    useEffect(() => {
        if (hasStarted && currentIndex === null) setCurrentIndex(0)
    }, [ hasStarted, currentIndex ])

    useEffect(() => {
        if (currentIndex === numberOfSegments) onFinished?.();
    }, [ currentIndex, numberOfSegments ])

    return {
        currentIndex,

        hasStarted() {
            return currentIndex !== null;
        },

        hasFinished() {
            return currentIndex === numberOfSegments;
        },

        hasReached(segment: T) {
            if (currentIndex === null) return false;
            return segments.indexOf(segment) <= currentIndex
        },

        hasPassed(segment: T) {
            if (currentIndex === null) return false;
            return segments.indexOf(segment) < currentIndex
        },

        hasNotReached(segment: T) {
            return !this.hasReached(segment);
        },

        hasNotPassed(segment: T) {
            return !this.hasPassed(segment)
        },

        isAt(segment: T) {
            return segments.indexOf(segment) === currentIndex
        },

        has(options: HasOptions<T>) {
            let result = true;
            if (options.reached) {
                result = result && this.hasReached(options.reached)
            }
            if (options.notReached) {
                result = result && this.hasNotReached(options.notReached)
            }
            if (options.passed) {
                result = result && this.hasPassed(options.passed)
            }
            if (options.notPassed) {
                result = result && this.hasNotPassed(options.notPassed)
            }
            return result;
        },

        jumpTo(segment: T) {
            const index = segments.indexOf(segment);
            setCurrentIndex(index);
        },

        next() {
            setCurrentIndex(index => index === null ? null : Math.min(index + 1, numberOfSegments))
        },

        select<R>(values: Record<T, R>): R | null{
            if (!currentIndex) return null;
            const segment = segments[currentIndex]
            return values[segment];
        },

        restart() {
            setCurrentIndex(null)
        }
    }
}
