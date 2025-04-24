import { useLocalSearchParams } from "expo-router";
import { Tree } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Tree encounter={`common/palm-tree/${namespace}/${id}` as any} focus="palm-tree" />
}
