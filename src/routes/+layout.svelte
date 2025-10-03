<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/logo.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { ClerkProvider } from 'svelte-clerk';
	import { shadcn } from '@clerk/themes';
	import { env } from '$env/dynamic/public';
	import { getLocale, type Locale } from '$lib/paraglide/runtime';
	import { deDE, enUS, esES, frFR, jaJP, ptBR, zhCN } from '@clerk/localizations';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';

	let { children } = $props();

	const getClerklocale = (locale: Locale) => {
		if (locale === 'en') return enUS;
		if (locale === 'de') return deDE;
		if (locale === 'es') return esES;
		if (locale === 'fr') return frFR;
		if (locale === 'ja') return jaJP;
		if (locale === 'pt') return ptBR;
		if (locale === 'zh') return zhCN;

		return enUS;
	};

	setupConvex(PUBLIC_CONVEX_URL);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Vitaes</title>
	<meta name="description" content="Resume Builder" />
	<meta name="keywords" content="resume, builder, resume builder, resume builder app" />
	<meta name="creator" content="@diegopluna" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Vitaes" />
	<meta name="twitter:description" content="Resume Builder" />
	<meta name="twitter:creator" content="@diegopeterl" />
	<meta name="twitter:site" content="@diegopeterl" />
	<meta name="og:type" content="website" />
	<meta name="og:title" content="Vitaes" />
	<meta name="og:site_name" content="Vitaes" />
	<meta name="og:url" content={env.PUBLIC_APP_URL} />
	<meta name="og:description" content="Resume Builder" />
</svelte:head>

<ModeWatcher />
<ClerkProvider appearance={{ theme: shadcn }} localization={getClerklocale(getLocale())}>
	{@render children?.()}
</ClerkProvider>
