<script>
    import { getWeatherData, createWeatherLineChart, getSunriseSunset } from "./utils/weather";
    import { onMount } from "svelte";

    var lat = 35.779591;
    var long = -78.638176;

    onMount(() => {
        Promise.all([
            getWeatherData(lat, long),
            getSunriseSunset(lat, long)
        ]).then(function(result) {
            if (result.length == 2) {
                createWeatherLineChart("cloudCoverChart", 'cloudCover', 'Cloud Cover:', result[0], result[1])
            }
        })
    })
    
</script>




<div class="flex flex-col justify-center items-center rounded-md p-5 shadow-sm shadow-slate-400">
    <h2 class="text-4xl text-center">Cloud Cover:</h2>
    <div style="width: 100%; height: 100%;" class="">
        <canvas id="cloudCoverChart"></canvas>
    </div>
</div>
