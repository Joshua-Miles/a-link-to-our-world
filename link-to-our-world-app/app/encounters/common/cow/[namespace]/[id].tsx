import { useLocalSearchParams } from "expo-router";
import { Cow } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Cow encounter={`common/cow/${namespace}/${id}` as any} />
}
