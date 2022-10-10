<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	// import { Html5QrcodeScanner } from 'html5-qrcode';
	import Device from 'svelte-device-info';
  import Quagga from 'quagga';
	import Button from '../cta/Button.svelte';

	let dispatch = createEventDispatcher();
  let isMobile = false;
	function onScanSuccess(decodedText: string) {
		dispatch('code', decodedText);
    console.log(decodedText);
	}

	function onScanFailure(err: any) {
		dispatch('err', err);
	}

	onMount(() => {
    initScanner();
	});

  function initScanner() {
		if (Device.isMobile || Device.isPhone || Device.isTablet) {
      isMobile = true;
      Quagga.init({
        inputStream: {
          name: 'barcode scanner',
          type: 'LiveStream',
          target: '#reader'
        },
        decoder: { readers: ['code_128_reader']}
      }, initQuagga)
		}
  }

  function initQuagga(err: any) {
    if (err) {
      console.log(err);
      return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
  }

  function decodeSingle() {
    Quagga.decodeSingle(onScanSuccess);
  }
</script>

<div id="reader" />

{#if isMobile}
<Button on:click={decodeSingle}>Scan</Button>
{/if}
