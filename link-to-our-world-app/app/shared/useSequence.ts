import { useEffect, useState } from "react";

type Options = {
    hasStarted: boolean
}

type HasOptions<T> = {
    reached?: T;
    notReached?: T;
    passed?: T;
    notPassed?: T
}

export function useSequence<T extends string>({ hasStarted }: Options, segments: T[]) {
    const [ currentIndex, setCurrentIndex ] = useState<null | number>(null)

    useEffect(() => {
        if (hasStarted && currentIndex === null) setCurrentIndex(0)
    }, [ hasStarted ])

    return {
        currentIndex,

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

        next() {
            setCurrentIndex(index => index === null ? null : index + 1)
        }
    }
}
