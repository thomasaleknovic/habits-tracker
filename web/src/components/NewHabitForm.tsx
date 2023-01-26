import { Check } from "phosphor-react";
import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { api } from "../lib/axios";

const availableWeekDay = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = React.useState<string>();
  const [weekDays, setWeekDays] = React.useState<number[]>([]);

  async function createNewHabit(event: React.FormEvent) {
    event.preventDefault();
    if (!title || weekDays.length === 0) {
      return alert("Preencha o Título e pelo menos um dia na semana.");
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Hábito criado com sucesso!");
  }

  function handleToggleWeekDays(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6 ">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDay.map((day, index) => (
          <Checkbox.Root
            className="flex items-center gap-3 group"
            key={day}
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDays(index)}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check color="white" size={20} />
              </Checkbox.Indicator>
            </div>
            <span className=" text-white leading-tight">{day}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className=" mt-6  rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
