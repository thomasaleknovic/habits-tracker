import { Text, View, ScrollView, Alert } from "react-native";

import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

import Header from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../lib/axios";
import React from "react";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [summary, setSummary] = React.useState<SummaryProps | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

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
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithHabit = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              return (
                <HabitDay
                  key={date.toString()}
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                  amountCompleted={dayWithHabit?.completed}
                  amountOfHabits={dayWithHabit?.amount}
                  date={date}
                />
              );
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900  rounded-lg border-2 opacity-40 border-zinc-800 m-1"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
