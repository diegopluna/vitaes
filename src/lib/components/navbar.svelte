<script lang="ts">
	import {
		Sheet,
		SheetContent,
		SheetFooter,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from './ui/sheet';
	import { IconBrandGithubFilled, IconMenu } from '@tabler/icons-svelte';
	import { Separator } from './ui/separator';
	import { Button } from './ui/button';
	import { m } from '$lib/paraglide/messages';
	import LanguageSelector from './language-selector.svelte';
	import ThemeToggle from './theme-toggle.svelte';
	import { UserButton } from 'svelte-clerk';

	let { showUserButton = false }: { showUserButton?: boolean } = $props();
</script>

<header
	class="bg-opacity-15 lg:max-screen-xl sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-xl border border-secondary bg-card p-2 shadow-inner md:w-[70%] lg:w-[75%]"
>
	<a href="/" class="flex items-center text-lg font-bold">
		<enhanced:img src="$lib/assets/logo.svg" alt="Vitaes" class="size-9" />
		Vitaes
	</a>

	<div class="flex items-center lg:hidden">
		<Sheet>
			<SheetTrigger>
				<IconMenu class="cursor-pointer lg:hidden" />
			</SheetTrigger>
			<SheetContent side="left" class="flex flex-col justify-between border-secondary bg-card">
				<SheetHeader class="mb-4 ml-4">
					<SheetTitle class="flex items-center">
						<a href="/" class="flex items-center">
							<enhanced:img src="$lib/assets/logo.svg" alt="Vitaes" class="size-9" />
							Vitaes
						</a>
					</SheetTitle>
				</SheetHeader>
				<SheetFooter class="flex-col items-start justify-start sm:flex-col">
					<Separator class="mb-2" />
					<LanguageSelector />
					<ThemeToggle />
					{#if showUserButton}
						<UserButton
							appearance={{
								elements: {
									rootBox: 'mx-2.5',
									userButtonBox: 'flex flex-row-reverse'
								}
							}}
						/>
					{/if}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	</div>

	<div class="hidden lg:flex">
		<LanguageSelector />
		<ThemeToggle />
		<Button variant="ghost" size="sm">
			<a
				aria-label={m['navbar.github']()}
				href="https://github.com/diegopluna/vitaes"
				target="_blank"
				rel="noreferrer"
			>
				<IconBrandGithubFilled className="size-5" />
			</a>
		</Button>
		{#if showUserButton}
			<UserButton
				appearance={{
					elements: {
						userButtonTrigger: 'mx-2.5'
					}
				}}
			/>
		{/if}
	</div>
</header>
