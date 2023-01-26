import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { Check } from "phosphor-react";
import dayjs from "dayjs";

interface HabitProps {
  amount?: number;
  completed?: number;
  date?: Date;
}

function HabitDay({ completed = 0, amount = 0, date }: HabitProps) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayName = dayjs(date).format("dddd");
  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10  border-2  border-zinc-800 bg-zinc-900 rounded-lg ",
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
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayName}</span>
          <span className="mt-1 font-extrabold text-3xl leading-tight">
            {dayAndMonth}
          </span>
          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
                <Checkbox.Indicator>
                  <Check color="white" size={20} />
                </Checkbox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default HabitDay;
