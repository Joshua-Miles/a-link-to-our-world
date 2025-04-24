import { useLocalSearchParams } from "expo-router";
import { Wolf } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Wolf encounter={`common/wolf/${namespace}/${id}` as any} />
}
