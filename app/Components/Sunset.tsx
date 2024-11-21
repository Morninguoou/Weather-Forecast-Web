'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { sunset } from '@/app/utils/icons';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Sunset() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    }

    const unixSunsetTimes = forecast?.sys?.sunset;
    const timezone = forecast?.timezone;

    const sunsetTime = unixToTime(unixSunsetTimes,timezone);

    return (
      <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
        <div className="top">
            <h2 className='flex items-center gap-2 font-semibold'>{sunset}Sunset</h2>
            <p className='pt-7 text-4xl font-extrabold flex justify-center'>{sunsetTime}</p>
        </div>
      </div>
    )
}

export default Sunset;