import { useLocalSearchParams } from "expo-router";
import { Well } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Well encounter={`common/well/${namespace}/${id}` as any} />
}
