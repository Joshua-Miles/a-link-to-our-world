import { useLocalSearchParams } from "expo-router";
import { Chest } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Chest encounter={`common/chest/${namespace}/${id}` as any} />
}
