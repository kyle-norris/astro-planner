<script>
  import CloudCover from "$lib/CloudCover.svelte";
  import Visibility from "$lib/Visibility.svelte";

</script>


<h1 class="text-7xl text-center mt-10">Astronomy Planner</h1>

<h2 class="text-5xl text-center mb-4 mt-20">Weather Report</h2>
<div class="flex max-w-7xl mx-auto justify-around">
  
  <div class="flex-1 mr-5">
    <CloudCover />
  </div>
  <div class="flex-1 ml-5">
    <Visibility />
  </div>
  
</div>
