import { useLocalSearchParams } from "expo-router";
import { Wolf } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Wolf encounter={`common/tree/${namespace}/${id}` as any} />
}
