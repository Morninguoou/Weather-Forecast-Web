'use client'
import { useGlobalContext } from '@/app/context/globalContext';
import { droplets } from '@/app/utils/icons'
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Humidity() {
    const {forecast } = useGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
        return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    }
    
    const { humidity } = forecast?.main;

    const getHumidityText = (humidity: number) => {
        if (humidity < 30) return "Dry: May cause skin irritation";
        if (humidity >= 30 && humidity < 50)
          return "Comfortable: Ideal for health and comfort";
        if (humidity >= 50 && humidity < 70)
          return "Moderate: Sticky, may increase allergens";
        if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
        return "Unavailable: Humidity data not available";
      };

    return (
      <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
        <div className="top">
          <h2 className='flex items-center gap-2 font-semibold'>{droplets}Humidity</h2>
          <p className="pt-4 text-3xl font-extrabold">{humidity}%</p>
        </div>
        <p className="text-sm">{getHumidityText(humidity)}.</p>
      </div>
    )
}   

export default Humidity