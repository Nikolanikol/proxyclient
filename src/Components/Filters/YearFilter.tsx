import { ScrollArea } from "@/UI/Shadcn/ShadcnScrollArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/UI/Shadcn/ShadncnSelect";
import { generateNumbersArray } from "@/Utils/generateNumbersArray";
import { useState } from "react";
import { CalculatorIcon } from "lucide-react";
import { useStores } from "@/Store/RootStoreContext";

const YearFilter = () => {
  const [year, setYear] = useState<string>();
  const { filterStore } = useStores();

  const data = generateNumbersArray(1995, 2025, 1);
  const handleClick = (value: string) => {
    setYear(value);
    filterStore.setYearFilter(value);
  };
  return (
    <div>
      <div className="text-left flex gap-2">
        <CalculatorIcon />
        <h2> Год от</h2>
      </div>
      <Select value={year} onValueChange={handleClick}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выбери жанр" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-100">
            <SelectItem value={"Все"}> Все</SelectItem>
            {data.map((item) => (
              <SelectItem
                key={item}
                className="cursor-pointer border-1 border-teal-700"
                value={item.toString()}
              >
                {" "}
                {item}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearFilter;
