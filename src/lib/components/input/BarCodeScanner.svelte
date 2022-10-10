<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import Device from 'svelte-device-info';
	import Button from '../cta/Button.svelte';

	let isMobile = false;
	let html5QrcodeScanner;
	let scan = createEventDispatcher();
	let error = createEventDispatcher();
  let scanned = false;

	function onScanSuccess(decodedText: string, decodedResult: any) {
		scan(decodedText);
    scanned = true;
	}

	function onScanFailure(err: any) {
		error(err);
	}

	onMount(() => {
    bindScan();
	});

  function bindScan() {
    scanned = false;
    let scanTypes = [0,1];
		if (Device.isMobile || Device.isPhone || Device.isTablet) {
      isMobile = true;
      html5QrcodeScanner = new Html5QrcodeScanner(
        'reader',
        {
          fps: 30,
          qrbox: { width: 320, height: 240 },
          supportedScanTypes: scanTypes,
          rememberLastUsedCamera: true
        },
        false
      );
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
		}
  }
</script>

{#if !scanned}
  <div id="reader" />
{:else}
  <Button on:click={() => bindScan()}>Rescan</Button>
{/if}
