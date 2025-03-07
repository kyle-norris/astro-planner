import { fetchWeatherApi } from 'openmeteo';
import LineChart from 'chart.js/auto';
import { format, differenceInHours, parse } from "date-fns";

export async function getWeatherData(lat: number, long: number) {
    const params = {
        "latitude": lat,
        "longitude": long,
        "hourly": ["cloud_cover", "visibility"],
        "forecast_days": 1
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {

        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            cloudCover: hourly.variables(0)!.valuesArray()!,
            visibility: hourly.variables(1)!.valuesArray()!,
        },

    };

    return weatherData;

}


interface WeatherData {
    hourly: {
        time: Date[],
        cloudCover: Float32Array<ArrayBufferLike>,
        visibility: Float32Array<ArrayBufferLike>
    }
}

interface SunriseSunset {
    results: {
        date: string,
        sunrise: string,
        sunset: string,
        first_light: string,
        last_light: string,
        dawn: string,
        dusk: string,
        solar_noon: string,
        golden_hour: string,
        day_length: string,
        timezone: string,
        utc_offset: string,
    }
}


export async function getSunriseSunset(lat: number, lng: number) {
    const url = "https://api.sunrisesunset.io/json?" + new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString()
    });
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return false;
        } else {
            const results: SunriseSunset = await response.json();
            return results;
        }
    } catch {
        return false;
    }
}


export async function createWeatherLineChart(
    id: string,
    value: 'cloudCover' | 'visibility',
    title: string,
    weatherData: WeatherData,
    sunriseSunset: SunriseSunset | false
) {
    var sunset_date: Date | null = null;
    var sunrise_date: Date | null = null;

    if (sunriseSunset) {
        var sunset = sunriseSunset.results.date + " " + sunriseSunset.results.sunset;
        sunset_date = new Date(Date.parse(sunset));

        var sunrise = sunriseSunset.results.date + " " + sunriseSunset.results.sunrise;
        sunrise_date = new Date(Date.parse(sunrise));

    }

    var time = weatherData.hourly.time;
    var data = weatherData.hourly[value];

    var x_axis: string[] = [];
    var y_axis: number[] = [];

    time.forEach((dt, idx) => {
        if (sunset_date && differenceInHours(dt, sunset_date) > 0 || sunrise_date && differenceInHours(dt, sunrise_date) < 0) {
            x_axis.push(format(dt, "h:mm a"));
            y_axis.push(data[idx]);
        }
    })

    var el: HTMLCanvasElement | null = document.getElementById(id) as HTMLCanvasElement;

    if (el != null) {
        new LineChart(
            el,
            {
                type: 'line',
                data: {
                    labels: x_axis,
                    datasets: [
                        {
                            label: title,
                            data: y_axis,
                            fill: 'origin',
                            borderColor: "rgba(0, 0, 0, 0.9)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    elements: {
                        point: {
                            radius: 0,
                            hitRadius: 20,
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: true
                            }
                        },
                        y: {
                            grid: {
                                display: false,
                            }
                        }
                    }
                }
            }
        );
    }
}