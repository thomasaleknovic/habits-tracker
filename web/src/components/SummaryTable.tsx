import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import HabitDay from "./HabitDay";

function SummaryTable() {
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  const summaryDates = generateDatesFromYearBeginning();

  const minimumSummaryDatesSize = 18 * 7;
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-zinc-400 text-xl w-10 h-10 flex items-center justify-center font-bold "
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => (
          <HabitDay
            key={date.toString()}
            amount={5}
            completed={Math.round(Math.random() * 5)}
          />
        ))}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed "
            />
          ))}
      </div>
    </div>
  );
}

export default SummaryTable;
