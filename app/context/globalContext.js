'use client';
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { debounce } from "lodash";

import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({children}) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDaysForecast, setFiveDaysForecast] = useState({});
    const [uvIndex, setUvIndex] = useState({});

    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [inputValue, setInputValue] = useState('');
    const [activeCityCoords, setActiveCityCoords] = useState([40.7128,-74.006]);

    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

            setForecast(res.data);
        } catch (e) {
            console.log("Error fetching forecast data: ",e.message);
        }
    };

    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);

            setAirQuality(res.data);
        } catch (e) {
            console.log("Error fetching air quality data: ",e.message);
        }
    };

    const fetchFiveDaysForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fivedays?lat=${lat}&lon=${lon}`);

            setFiveDaysForecast(res.data);
        } catch (e) {
            console.log("Error fetching five days forecast data: ",e.message);
        }
    }

    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);

            setUvIndex(res.data);
        } catch (e) {
            console.log("Error fetching Uv Index data", e.message);
        }
    }

    const fetchGeoCodedList = async (search) => {
        try {
            const res = await axios.get(`api/geocoded?search=${search}`);
            setGeoCodedList(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("Error fetching geocoded list:", e.message);
            setGeoCodedList([]);
        }
    };

    //handel input
    const handleInput = (e) => {
        if (e.target.value === "") {
            setGeoCodedList(defaultStates); 
        }
        if (e.target.value == undefined){
            setInputValue('')
        }
        else{
            setInputValue(e.target.value);
        }
    };

    //debounce
    useEffect(() => {
        const debouncedFetch = debounce((search) => {
          fetchGeoCodedList(search);
        }, 500);
    
        if (inputValue) {
          debouncedFetch(inputValue);
        }
    
        // cleanup
        return () => debouncedFetch.cancel();
    }, [inputValue]);

    useEffect(() => {
        fetchForecast(activeCityCoords[0],activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0],activeCityCoords[1]);
        fetchFiveDaysForecast(activeCityCoords[0],activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0],activeCityCoords[1]);
    }, [activeCityCoords]);

    return(
        <GlobalContext.Provider 
            value={{
                forecast,
                airQuality,
                fiveDaysForecast,
                uvIndex,
                geoCodedList,
                inputValue,
                handleInput,
                setActiveCityCoords,
            }}>
            <GlobalContextUpdate.Provider 
                value={{
                    setActiveCityCoords,
                }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
