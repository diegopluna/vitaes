<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { ClerkProvider } from 'svelte-clerk';
	import { shadcn } from '@clerk/themes';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<ClerkProvider appearance={{ theme: shadcn }}>
	{@render children?.()}
</ClerkProvider>
