import { useLocalSearchParams } from "expo-router";
import { Well } from "shared";

export default () => {
    const { namespace, id } = useLocalSearchParams();
    return <Well focus="pool" encounter={`common/pool/${namespace}/${id}` as any} />
}
