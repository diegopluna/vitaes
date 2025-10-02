<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-screen w-full items-center justify-center">
	<div class="w-[22rem]">
		<div class="flex flex-col items-center justify-center gap-4">
			{@render children()}
		</div>
	</div>
</div>
