<script lang="ts">
  export let caption: string;
  export let hideCaption: boolean = false;
  export let headers: string[] = [];
</script>

<table>
  <caption class:sr-only={hideCaption}>{caption}</caption>

  <!-- headers -->
  <thead>
    {#if $$slots.headerTemplate}
      <slot name="headerTemplate"></slot>
    {:else}
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
    {/if}
  </thead>

  <!-- table data -->
  <tbody>
    <slot></slot>
  </tbody>
</table>

<style>
  table {
    width: 100%;
    margin-bottom: 40px;
  }
</style>