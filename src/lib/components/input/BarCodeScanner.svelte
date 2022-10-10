<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import Device from 'svelte-device-info';

	let html5QrcodeScanner;
	let dispatch = createEventDispatcher();

	function onScanSuccess(decodedText: string, decodedResult: any) {
		dispatch('code', decodedText);
	}

	function onScanFailure(err: any) {
		dispatch('err', err);
	}

	onMount(() => {
    bindScan();
	});

  function bindScan() {
    let scanTypes = [0,1];
		if (Device.isMobile || Device.isPhone || Device.isTablet) {
      html5QrcodeScanner = new Html5QrcodeScanner(
        'reader',
        {
          fps: 30,
          qrbox: { width: 320, height: 240 },
          // supportedScanTypes: scanTypes,
          rememberLastUsedCamera: true
        },
        false
      );
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
		}
  }
</script>

<div id="reader" />
