<script lang="ts">
	import { setMode, toggleMode } from 'mode-watcher';
	import { Button } from './ui/button';
	import { IconMoon, IconSun } from '@tabler/icons-svelte';
	import { m } from '$lib/paraglide/messages';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from './ui/dropdown-menu';
	import { SidebarMenuButton } from './ui/sidebar';

	let { inSidebar = false }: { inSidebar?: boolean } = $props();
</script>

{#if !inSidebar}
	<Button variant="ghost" size="sm" onclick={() => toggleMode()}>
		<div class="flex items-center gap-2 dark:hidden">
			<IconMoon class="size-5" />
			<span class="block lg:hidden">{m['theme-toggle.dark']()}</span>
		</div>

		<div class="hidden items-center gap-2 dark:flex">
			<IconSun className="size-5" />
			<span class="block lg:hidden">{m['theme-toggle.dark']()}</span>
		</div>

		<span class="sr-only">{m['theme-toggle.toggle-theme']()}</span>
	</Button>
{:else}
	<DropdownMenu>
		<DropdownMenuTrigger>
			<SidebarMenuButton tooltipContent={m['theme-toggle.toggle-theme']()}>
				<IconSun
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
				/>
				<IconMoon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
				/>
				<span>{m['theme-toggle.toggle-theme']()}</span>
			</SidebarMenuButton>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem onclick={() => setMode('light')}>
				{m['theme-toggle.light']()}
			</DropdownMenuItem>
			<DropdownMenuItem onclick={() => setMode('dark')}>
				{m['theme-toggle.light']()}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
{/if}
