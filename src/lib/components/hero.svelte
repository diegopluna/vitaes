<script lang="ts">
	import { IconArrowRight } from '@tabler/icons-svelte';
	import { m } from '$lib/paraglide/messages';
	import { Button } from './ui/button';
	import { mode } from 'mode-watcher';
	import { getLocale } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';

	const locale = getLocale();
</script>

<section class="container mx-auto">
	<div class="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-lg">
		<div class="space-y-8 text-center">
			<div class="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
				<h1>
					{m['landing.action']()}
					<span
						class="bg-gradient-to-r from-neutral-600 to-primary bg-clip-text px-2 text-transparent"
					>
						Vitaes
					</span>
				</h1>
			</div>
			<p class="mx-auto max-w-screen-sm text-xl text-muted-foreground">
				{m['landing.sub-action']()}
			</p>

			<div class="space-y-4 md:space-y-0 md:space-x-4">
				<Button class="group/arrow w-5/6 font-bold md:w-1/4" onclick={() => goto('/sign-in')}>
					{m['landing.action-button']()}
					<IconArrowRight
						class="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1"
					/>
				</Button>
			</div>
		</div>

		<div class="group relative mt-14">
			<div
				class="absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 bg-primary/50 blur-3xl lg:-top-8 lg:h-80"
			></div>
			<!-- <enhanced:img -->
			<!-- 	alt="Vitaes" -->
			<!-- 	src={`$lib/assets/${locale}-${mode.current}.jpeg`} -->
			<!-- 	class="relative mx-auto flex w-full items-center rounded-lg border border-t-2 border-secondary border-t-primary/30 leading-none md:w-[1200px]" -->
			<!-- /> -->
			<div
				class="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28"
			></div>
		</div>
	</div>
</section>
