import AirPollution from "./Components/AirPollution";
import DailyForecast from "./Components/DailyForecast";
import FeelsLike from "./Components/FeelsLike";
import FiveDayForecast from "./Components/FiveDayForecast";
import Humidity from "./Components/Humidity";
import Mapbox from "./Components/Mapbox";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population";
import Pressure from "./Components/Pressure";
import Sunrise from "./Components/Sunrise";
import Sunset from "./Components/Sunset";
import Temperature from "./Components/Temperature";
import UvIndex from "./Components/UvIndex";
import Visibility from "./Components/Visibility";
import defaultStates from "./utils/defaultStates";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx[16rem] m-auto">
      <Navbar/>
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature/>
          <FiveDayForecast/>
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution/>
            <Sunrise/>
            <Sunset/>
            <DailyForecast/>
            <UvIndex/>
            <Population/>
            <FeelsLike/>
            <Humidity/>
            <Visibility/>
            <Pressure/>
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox/>
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-semibold">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return <div key={index} className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none">
                    <p className="px-6 py-4">{state.name}</p>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-6 flex justify-center pb-8">
        <p className="footer-text text-sm font-semibold flex items-center gap-1">
          Made by Nirada
        </p>
      </footer>
    </main>
  );
}