<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import Device from 'svelte-device-info';

	let html5QrcodeScanner;
	let dispatch = createEventDispatcher();
  let mobile = false;

  export let value;

	function onScanSuccess(decodedText: string, decodedResult: any) {
		dispatch('code', decodedText);
    value = decodedText;
	}

	function onScanFailure(err: any) {
		dispatch('err', err);
	}

	onMount(() => {
    initScanner();
	});

  function initScanner() {
    let scanTypes = [0,1];
		if (Device.isMobile || Device.isPhone || Device.isTablet) {
      mobile = true;
      let config = {
        fps: 30,
        qrbox: { width: 320, height: 240 },
        supportedScanTypes: scanTypes,
        rememberLastUsedCamera: true,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
      }
      html5QrcodeScanner = new Html5QrcodeScanner(
        'reader',
        config,
        false,
      );
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
		}
  }
</script>

<div id="reader" />
