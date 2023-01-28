import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import React from "react";
import { api } from "../lib/axios";
import Loading from "../components/Loading";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
  date: string;
}

interface DayInfoParams {
  completedHabits: string[];
  possibleHabits: Array<{
    created_at: string;
    title: string;
    id: string;
  }>;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const [dayInfo, setDayInfo] = React.useState<DayInfoParams | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [completedHabits, setCompletedHabits] = React.useState<string[]>([]);

  const parsedDate = dayjs(date);
  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/day", {
        params: { date: date },
      });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "ops",
        "Não foi possível carregar as informações dos hábitos"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível atualizar o status do hábito.");
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="text-zinc-400 text-base font-semibold mt-6 ">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", { "opacity-50": isDateInPast })}>
          {dayInfo?.possibleHabits ? (
            dayInfo?.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white  mt-10 text-center">
            Hábitos de data passadas não podem ser editados.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
