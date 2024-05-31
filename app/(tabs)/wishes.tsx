import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function Wishes() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Wishes</Text>
    </SafeAreaView>
  );
}
