import { persist, Serial, Float } from "@triframe/scribe";

export type MemorySlug =
    'memory-1'
    | 'memory-2'

export type Memory = {
    id: Serial
    playerId: number;
    slug: MemorySlug;
    imageUUID: string;
}

export const Memories = persist<Memory>()
    .primaryKey('id')
    .uniqueIndexBy('playerId', 'slug')
    .indexBy('playerId')

