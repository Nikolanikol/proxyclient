import { ScrollArea } from "@/UI/Shadcn/ShadcnScrollArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/UI/Shadcn/ShadncnSelect";
import { generateNumbersArray } from "@/Utils/generateNumbersArray";
import { CalculatorIcon } from "lucide-react";
import { useStores } from "@/Store/RootStoreContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const YearFilter = observer(() => {
  const navigate = useNavigate();

  const { filterStore } = useStores();
  const year = filterStore.yearFilter
    ? filterStore.yearFilter.split("-")[0]
    : "";

  const data = generateNumbersArray(1995, 2025, 1);
  const handleClick = (value: string) => {
    filterStore.setFetchMode("noSearch");
    filterStore.setYearFilter(value);
    navigate("");
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="text-left flex gap-2">
        <CalculatorIcon />
        <h2> Год от</h2>
      </div>
      <Select value={year} onValueChange={handleClick}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выбери год" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-100">
            <SelectItem value={null}> Все</SelectItem>
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
});

export default YearFilter;
