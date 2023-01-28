import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import LogoImage from "../assets/logo.svg";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <LogoImage />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-violet-500 items-center justify-center rounded-lg"
        onPress={() => navigate("new")}
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
