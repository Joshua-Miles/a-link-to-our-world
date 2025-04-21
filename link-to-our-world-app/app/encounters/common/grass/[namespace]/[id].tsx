import { useLocalSearchParams } from "expo-router";
import { Grass } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Grass encounter={`common/grass/${namespace}/${id}` as any} />
}
