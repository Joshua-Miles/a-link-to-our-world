export type Point = {
    latitude: number
    longitude: number
}

const RADIUS_OF_EARTH = 6371; // Radius of the Earth in km

const toRadians = (degrees: number) => degrees * (Math.PI / 180);

export function distance(point1: Point, point2: Point): number {
    const dLat = toRadians(point2.latitude - point1.latitude);
    const dLon = toRadians(point2.longitude - point1.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(point1.latitude)) * Math.cos(toRadians(point2.latitude)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIUS_OF_EARTH * c; // Distance in km
}
