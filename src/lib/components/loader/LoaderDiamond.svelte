<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";

  export let duration = 750;
  let counter = 0;
  let limit = 8;
  let interval: NodeJS.Timer;

  onMount(() => {
    interval = setInterval(() => {
      counter++;
      if (counter === limit) {
        counter = 0;
      }
    }, duration);
  })
  let items = [
    0, 1, 2, 
    7, 9, 3, 
    6, 5, 4]

  onDestroy(() => {
    clearInterval(interval)
  })
</script>

<div class="diamond-grid">
  {#each items as item}
    <div class='grid-item'>
      {#if counter === item}
        <div style="
          background: red;
          width: 20px;
          height: 20px;
          border-radius: 2px;
        " transition:fade={{duration}}></div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .diamond-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 90px;
    height: 90px;
  }

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>