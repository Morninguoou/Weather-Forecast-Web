'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { sunrise } from '@/app/utils/icons';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Sunrise() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    }

    const unixSunriseTimes = forecast?.sys?.sunrise;
    const timezone = forecast?.timezone;

    const sunriseTime = unixToTime(unixSunriseTimes,timezone);

    return (
      <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
        <div className="top">
            <h2 className='flex items-center gap-2 font-semibold'>{sunrise}Sunrise</h2>
            <p className='pt-7 text-4xl font-extrabold flex justify-center'>{sunriseTime}</p>
        </div>
      </div>
    )
}

export default Sunrise;