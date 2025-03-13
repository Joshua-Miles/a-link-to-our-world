import { Coordinate } from ".";

const RADIUS_OF_EARTH_IN_METERS = 6371e3;
const FEET_PER_METER = 3.28084;

export function feetBetween(coord1: Coordinate, coord2: Coordinate) {
    const lat1 = coord1.lat
    const lon1 = coord1.lng
    const lat2 = coord2.lat
    const lon2 = coord2.lng

    const φ1 = toRadian(lat1);
    const φ2 = toRadian(lat2);
    const Δφ = toRadian(lat2 - lat1);
    const Δλ = toRadian(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInMeters = RADIUS_OF_EARTH_IN_METERS * c;

    const distanceInFeet = distanceInMeters * FEET_PER_METER;

    return distanceInFeet;
}

function toRadian(x: number) {
    return x * Math.PI / 180;
}
