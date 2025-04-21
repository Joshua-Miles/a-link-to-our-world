import { useLocalSearchParams } from "expo-router";
import { Tree } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Tree encounter={`common/tree/${namespace}/${id}` as any} focus="snow-tree" />
}
