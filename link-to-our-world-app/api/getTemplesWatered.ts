import { AmbassadorClient } from "@triframe/ambassador";

export function getTemplesWatered(this: AmbassadorClient | void): Promise<{
    isFailure: true;
    code: "notAuthorized";
} | {
    totalComplete: number;
    gerudo: {
        id: number & {
            __serial__?: undefined | true;
        };
    } & {
        resolved: boolean;
    } & {
        imageSlug: string;
    } & {
        lat: number;
    } & {
        lng: number;
    } & {
        slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/tavon" | "faron/skull-kid-1" | "faron/skull-kid-2" | "faron/skull-kid-3" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/nimri" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/kyllis" | "necluda/keese" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache" | "interlude/intro" | "interlude/gorruk" | "interlude/vials" | "gerudo/intro" | "gerudo/tidebane" | "gerudo/tidebane-2" | "gerudo/robot" | "gerudo/ravia" | "gerudo/khenna" | "gerudo/eshara" | "gerudo/scervus" | "gerudo/temple" | "gerudo/cache" | "eldin/intro" | "eldin/bouldan" | "eldin/bouldan-2" | "eldin/mines" | "eldin/darvok" | "eldin/fyrus" | "eldin/lodron" | "eldin/temple" | "eldin/cache" | "zoras/intro" | "zoras/addison" | "zoras/nerali" | "zoras/throne-room" | "zoras/tentalus" | "zoras/zaylen" | "zoras/temple" | "zoras/cache" | "hebra/intro" | "hebra/kyllis" | "hebra/wolf" | "hebra/temple-1" | "hebra/temple-2" | "hebra/lloron-den" | "hebra/frostus" | "hebra/cache" | "finale/intro" | "finale/moblin-fight" | "finale/lizalfos-fight" | "finale/gibdo-fight" | "finale/darknut-fight" | "finale/talus-fight" | "finale/lynel-fight" | "finale/hyrule-united" | "finale/songs" | "finale/epilogue";
    } & {
        state: {};
    };
    eldin: {
        id: number & {
            __serial__?: undefined | true;
        };
    } & {
        resolved: boolean;
    } & {
        imageSlug: string;
    } & {
        lat: number;
    } & {
        lng: number;
    } & {
        slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/tavon" | "faron/skull-kid-1" | "faron/skull-kid-2" | "faron/skull-kid-3" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/nimri" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/kyllis" | "necluda/keese" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache" | "interlude/intro" | "interlude/gorruk" | "interlude/vials" | "gerudo/intro" | "gerudo/tidebane" | "gerudo/tidebane-2" | "gerudo/robot" | "gerudo/ravia" | "gerudo/khenna" | "gerudo/eshara" | "gerudo/scervus" | "gerudo/temple" | "gerudo/cache" | "eldin/intro" | "eldin/bouldan" | "eldin/bouldan-2" | "eldin/mines" | "eldin/darvok" | "eldin/fyrus" | "eldin/lodron" | "eldin/temple" | "eldin/cache" | "zoras/intro" | "zoras/addison" | "zoras/nerali" | "zoras/throne-room" | "zoras/tentalus" | "zoras/zaylen" | "zoras/temple" | "zoras/cache" | "hebra/intro" | "hebra/kyllis" | "hebra/wolf" | "hebra/temple-1" | "hebra/temple-2" | "hebra/lloron-den" | "hebra/frostus" | "hebra/cache" | "finale/intro" | "finale/moblin-fight" | "finale/lizalfos-fight" | "finale/gibdo-fight" | "finale/darknut-fight" | "finale/talus-fight" | "finale/lynel-fight" | "finale/hyrule-united" | "finale/songs" | "finale/epilogue";
    } & {
        state: {};
    };
    zoras: {
        id: number & {
            __serial__?: undefined | true;
        };
    } & {
        resolved: boolean;
    } & {
        imageSlug: string;
    } & {
        lat: number;
    } & {
        lng: number;
    } & {
        slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/tavon" | "faron/skull-kid-1" | "faron/skull-kid-2" | "faron/skull-kid-3" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/nimri" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/kyllis" | "necluda/keese" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache" | "interlude/intro" | "interlude/gorruk" | "interlude/vials" | "gerudo/intro" | "gerudo/tidebane" | "gerudo/tidebane-2" | "gerudo/robot" | "gerudo/ravia" | "gerudo/khenna" | "gerudo/eshara" | "gerudo/scervus" | "gerudo/temple" | "gerudo/cache" | "eldin/intro" | "eldin/bouldan" | "eldin/bouldan-2" | "eldin/mines" | "eldin/darvok" | "eldin/fyrus" | "eldin/lodron" | "eldin/temple" | "eldin/cache" | "zoras/intro" | "zoras/addison" | "zoras/nerali" | "zoras/throne-room" | "zoras/tentalus" | "zoras/zaylen" | "zoras/temple" | "zoras/cache" | "hebra/intro" | "hebra/kyllis" | "hebra/wolf" | "hebra/temple-1" | "hebra/temple-2" | "hebra/lloron-den" | "hebra/frostus" | "hebra/cache" | "finale/intro" | "finale/moblin-fight" | "finale/lizalfos-fight" | "finale/gibdo-fight" | "finale/darknut-fight" | "finale/talus-fight" | "finale/lynel-fight" | "finale/hyrule-united" | "finale/songs" | "finale/epilogue";
    } & {
        state: {};
    };
    hebra: {
        id: number & {
            __serial__?: undefined | true;
        };
    } & {
        resolved: boolean;
    } & {
        imageSlug: string;
    } & {
        lat: number;
    } & {
        lng: number;
    } & {
        slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/tavon" | "faron/skull-kid-1" | "faron/skull-kid-2" | "faron/skull-kid-3" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/nimri" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/kyllis" | "necluda/keese" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache" | "interlude/intro" | "interlude/gorruk" | "interlude/vials" | "gerudo/intro" | "gerudo/tidebane" | "gerudo/tidebane-2" | "gerudo/robot" | "gerudo/ravia" | "gerudo/khenna" | "gerudo/eshara" | "gerudo/scervus" | "gerudo/temple" | "gerudo/cache" | "eldin/intro" | "eldin/bouldan" | "eldin/bouldan-2" | "eldin/mines" | "eldin/darvok" | "eldin/fyrus" | "eldin/lodron" | "eldin/temple" | "eldin/cache" | "zoras/intro" | "zoras/addison" | "zoras/nerali" | "zoras/throne-room" | "zoras/tentalus" | "zoras/zaylen" | "zoras/temple" | "zoras/cache" | "hebra/intro" | "hebra/kyllis" | "hebra/wolf" | "hebra/temple-1" | "hebra/temple-2" | "hebra/lloron-den" | "hebra/frostus" | "hebra/cache" | "finale/intro" | "finale/moblin-fight" | "finale/lizalfos-fight" | "finale/gibdo-fight" | "finale/darknut-fight" | "finale/talus-fight" | "finale/lynel-fight" | "finale/hyrule-united" | "finale/songs" | "finale/epilogue";
    } & {
        state: {};
    };
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("getTemplesWatered");
}