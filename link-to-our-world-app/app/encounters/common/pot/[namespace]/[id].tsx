import { useLocalSearchParams } from "expo-router";
import { Pot } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Pot encounter={`common/pot/${namespace}/${id}` as any} />
}
