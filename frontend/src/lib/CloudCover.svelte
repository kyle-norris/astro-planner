<script>
    import { getWeatherData, createCloudCoverChart, getSunriseSunset } from "./weather";
    import { onMount } from "svelte";

    var lat = 35.779591;
    var long = -78.638176;

    onMount(() => {
        Promise.all([
            getWeatherData(lat, long),
            getSunriseSunset(lat, long)
        ]).then(function(result) {
            if (result.length == 2) {
                createCloudCoverChart("cloudCoverChart", result[0], result[1])
            }
        })
    })
    


</script>


<h2 class="text-4xl text-center">Cloud Cover:</h2>

<div class="flex justify-center">
    <div style="width: 800px;"><canvas id="cloudCoverChart"></canvas></div>
</div>
