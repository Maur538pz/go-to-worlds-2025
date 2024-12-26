'use client'

import { useEffect, useState } from "react";
import { Cell } from "./ui/Cell";
import { createClient, EntrySkeletonType } from 'contentful'

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
interface TotalResume {
  totalTime: number;
  totalEarnings: number;
  totalMilestones: number;
  totalTasks: number;
}

interface ResumeDayFields extends EntrySkeletonType {
  fields: {
    date: string;
    prodTime: number;
    earnings: number;
    milestone: number;
    tasks: number;
    stateDay: string;
  };
}


const generateDays = (days: number,dataReference: LogDay[]): CellDayData[] => {
  const tempDate = new Date();
  return Array.from({length: days}, (_,i) => {
    const dataStr = `${tempDate.toLocaleString("en-US", { month: "long", day: "numeric" })}`;
    tempDate.setDate(tempDate.getDate()+1);
    if (dataReference[i]) {
      return ({day: dataStr, log: dataReference[i]})
    }
    return ({day: dataStr})

  });
}


export const ActivityGraph = () => {
  const [resumeData, setResumeData] = useState<TotalResume>({totalEarnings:0,totalMilestones:0,totalTasks:0,totalTime:0});
  const [day, setDays] = useState<CellDayData[]>([])
  const [dataDays, setDataDays] = useState<LogDay[]>([]);
  const space = process.env.NEXT_PUBLIC_SPACE
  const token = process.env.NEXT_PUBLIC_TOKEN
  
  useEffect(() => {
    if (!space || !token) {
      console.error("Faltan las variables de entorno requeridas: NEXT_PUBLIC_SPACE o API_SECRET_KEY");
      return;
    }
    const client = createClient({
      space: space,
      accessToken: token,
    })



    const startDate = new Date('2024-12-25');
    const endDate = new Date('2025-10-16');
    const diferencia = endDate.getTime() - startDate.getTime();
    const miliSporDia = 1000 * 60 * 60 *24;
    const date = Math.ceil(diferencia / miliSporDia);
    //setDate(respuesta);
    const fetchData = async () => {
      try {
        const response = await client.getEntries<ResumeDayFields>({ content_type: "resumeDay"});
        const items = response.items;
        const itemsConvert: LogDay[] = items.map((e) => ({
          date: e.fields.date,
          time: e.fields.prodTime,
          earnings: e.fields.earnings,
          milestones: e.fields.milestone,
          tasks: e.fields.tasks,
          state: e.fields.stateDay,}))
        setDataDays(itemsConvert);
      }
      catch (error) {
        setDataDays([]);
        console.error("error al obtener ",error);
      }
    }
    fetchData()

    const dataCells = generateDays(date, dataDays);
    setDays(dataCells);


    const totalTime = dataDays.reduce((acc, current) => acc + current.time,0 )
    const totalEarnings = dataDays.reduce((acc,curr) => acc + curr.earnings,0)
    const totalMilestones = dataDays.reduce((acc,curr) => acc + curr.milestones,0)
    const totalTasks = dataDays.reduce((acc,curr) => acc + curr.tasks,0)
    setResumeData((prev) => ({...prev,totalTime, totalEarnings, totalMilestones, totalTasks}))



  },[dataDays, space, token])

  return (
    <div className="m-auto w-[1000px]">
      <div className="relative flex flex-col flex-wrap gap-2 h-40 ">
        {day.map((e) => <Cell key={e.day} data={e}/>)}
      </div>
      <div className="flex justify-around font-[family-name:var(--font-source_Serif_4)] text-2xl font-normal h-20 items-center">
        <span>Total time: {resumeData?.totalTime} h </span>
        <span>Earnings : ${resumeData.totalEarnings}</span>
        <span>Milestones : {resumeData.totalMilestones}</span>
        <span>Tasks : {resumeData.totalTasks}</span>
      </div>

    </div>
  )
}