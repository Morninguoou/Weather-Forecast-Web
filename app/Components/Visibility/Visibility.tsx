'use client'
import { useGlobalContext } from '@/app/context/globalContext';
import { eye } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Visibility() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.visibility) {
        return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />;
    }
    
    const { visibility } = forecast;

    const getVisibilityDescription = (visibility: number) => {
        const visibilityInKm = Math.round(visibility / 1000);

        if (visibilityInKm > 10) return "Excellent: Clear and vast view";
        if (visibilityInKm > 5) return "Good: Easily navigable";
        if (visibilityInKm > 2) return "Moderate: Some limitations";
        if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
        return "Unavailable: Visibility data not available";
    };


    return (
        <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className='flex items-center gap-2 font-semibold'>{eye}Visibility</h2>
                <p className="pt-4 text-3xl">{Math.round(visibility / 1000)} km</p>
            </div>
            <p className="text-sm">{getVisibilityDescription(visibility)}.</p>
        </div>
    )
}

export default Visibility
