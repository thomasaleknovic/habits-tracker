import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from "@expo/vector-icons";
import React from "react";
import colors from "tailwindcss/colors";

const availableWeekDay = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = React.useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    setWeekDays((prevState) =>
      prevState.filter((weekDay) => weekDay !== weekDayIndex)
    );
    if (weekDays.includes(weekDayIndex)) {
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
          placeholder="Ex.: Exercícios, Dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>
        {availableWeekDay.map((weekDay, index) => (
          <Checkbox
            checked={weekDays.includes(index)}
            title={weekDay}
            key={index}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          className="flex-row items-center justify-center mt-6 w-full bg-green-600 h-14 rounded-md"
          activeOpacity={0.7}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="text-white ml-2 font-semibold text-base">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
