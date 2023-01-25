import { Text, View, ScrollView } from "react-native";

import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

import Header from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { useNavigation } from "@react-navigation/native";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

export function Home() {
  const { navigate } = useNavigation();

  return (
    <View className="bg-background flex-1 px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            key={index}
            className="text-zinc-400 text-xl mx-1 text-center font-bold"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDay
              key={date.toString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900  rounded-lg border-2 opacity-40 border-zinc-800 m-1"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
