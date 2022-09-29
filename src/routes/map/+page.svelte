<script lang="ts">
  //#region Diagram setup
	import { Diagram } from 'artesgo-flox';
  let clientWidth: number;
  let clientHeight: number;
  $: width = Math.max(clientWidth, clientHeight) - 15;
  let rects: any[] = [];
  let svgPathProps: {
    fill: 'none',
    stroke: '#333',
    'stroke-width': 2,
    'stroke-linecap': 'square'
  }
  //#endregion
</script>

<section bind:clientWidth bind:clientHeight>
  <Diagram {width} {rects} {svgPathProps}></Diagram>
</section>

