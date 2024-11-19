'use client';
import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, rain, snow } from '@/app/utils/icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';

function Temperature() {
  const { forecast } = useGlobalContext();

  const [localTime, setLocalTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  const { main = {}, timezone = 0, name = '', weather = [] } = forecast || {};
  const { temp, temp_min, temp_max } = main || {};
  const { main: weatherMain = '', description = '' } = weather[0] || {};

  const getIcon = () => {
    switch (weatherMain) {
      case 'Drizzle':
        return drizzleIcon;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      case 'Clear':
        return clearSky;
      case 'Clouds':
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format('HH:mm:ss');
      const day = localMoment.format('dddd');

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!forecast || !weather.length) {
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />;
  }

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-4 font-semibold flex gap-1 justify-center">
        <span className="text-4xl">{name}</span>
      </p>
      <p className="py-10 text-9xl font-semibold self-center flex items-center">
        <span>{kelvinToCelsius(temp)}°</span>
        <span>{getIcon()}</span>
      </p>

      <div>
        <div className="flex justify-center">
          <p className="pt-1 capitalize text-2xl font-medium">{description}</p>
        </div>
        <p className="flex justify-center items-center gap-2 text-lg">
          <span>Low: {kelvinToCelsius(temp_min)}°</span>
          <span>High: {kelvinToCelsius(temp_max)}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;