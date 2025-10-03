<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale, locales, setLocale, type Locale } from '$lib/paraglide/runtime';
	import { IconLanguage } from '@tabler/icons-svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from './ui/dropdown-menu';
	import { SidebarMenuButton } from './ui/sidebar';
	import { Button } from './ui/button';

	const LANGUAGE_NAMES: Record<Locale, string> = {
		en: 'English',
		de: 'Deutsch',
		es: 'Español',
		fr: 'Français',
		ja: '日本語',
		pt: 'Português',
		zh: '中文'
	};

	let { inSidebar = false }: { inSidebar?: boolean } = $props();

	const locale = getLocale();
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#if inSidebar}
			<SidebarMenuButton tooltipContent={m['language-selector.select-language']()}>
				<IconLanguage class="size-[1.2rem]" />
				<span>{m['language-selector.select-language']()}</span>
			</SidebarMenuButton>
		{:else}
			<Button size="sm" variant="ghost">
				<div class="flex items-center gap-2">
					<IconLanguage class="size-5" />
					<span class="block lg:hidden">{LANGUAGE_NAMES[locale]}</span>
				</div>
			</Button>
		{/if}
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end">
		{#each locales as locale}
			<DropdownMenuItem onclick={() => setLocale(locale)}>
				{LANGUAGE_NAMES[locale]}
			</DropdownMenuItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>
