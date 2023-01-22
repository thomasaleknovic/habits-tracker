import { ActivityIndicator, View } from "react-native";

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#09090A",
      }}
    >
      <ActivityIndicator color="#7c3aed" />
    </View>
  );
}

export default Loading;
