import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import React from "react";

interface HabitProps {
  amount?: number;
  defaultCompleted?: number;
  date?: Date;
}

function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitProps) {
  const [completed, setCompleted] = React.useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayName = dayjs(date).format("dddd");

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10  border-2  border-zinc-800 bg-zinc-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage <= 80,
            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 && completedPercentage <= 60,
            "bg-violet-800 border-violet-600":
              completedPercentage >= 20 && completedPercentage <= 40,
            "bg-violet-900 border-violet-700":
              completedPercentage > 20 && completedPercentage < 20,
            "border-zinc-800 bg-zinc-900": completedPercentage === 0,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
          <span className="font-semibold text-zinc-400">{dayName}</span>
          <span className="mt-1 font-extrabold text-3xl leading-tight">
            {dayAndMonth}
          </span>
          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default HabitDay;
