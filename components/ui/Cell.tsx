import { useState } from "react";

interface LogDay {
  date: string;
  time: number;
  earnings: number;
  milestones: number;
  tasks: number;
  state: number;
}

interface CellDayData {
  day: string;
  log?: LogDay;
}

interface Props {
  data: CellDayData;
}

const selectColor = (state:number|undefined): string => {
  if (state === 0) return "bg-green-200";
  if (state === 1) return "bg-green-300";
  if (state === 2) return "bg-green-400";
  if (state === 3) return "bg-green-500";
  if (state === 4) return "bg-green-600";
  if (state === 5) return "bg-green-700";

  return "bg-slate-700"
}

export const Cell = ({data} :Props) => {
  const[onHover, setOnHover] = useState(false);
  const color = selectColor(data.log?.state);
  return (
    <div className={`h-4 w-4 relative rounded-sm m-0 ${color}`}
    onMouseEnter={() => {setOnHover(true)}}
    onMouseLeave={() => {setOnHover(false)}}
    >
      {onHover&&<div className="absolute bg-slate-400 h-6 w-32 inset-0 top-[-30px] -left-16 text-center rounded-sm z-[300]">
        {data.day}
      </div>}

    </div>
  )
}