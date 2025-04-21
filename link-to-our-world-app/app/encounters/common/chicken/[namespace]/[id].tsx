import { useLocalSearchParams } from "expo-router";
import { Chicken } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Chicken encounter={`common/chicken/${namespace}/${id}` as any} />
}
