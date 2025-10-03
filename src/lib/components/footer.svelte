<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Separator } from './ui/separator';
</script>

<footer id="footer" class="container mx-auto py-24 sm:py-32">
	<div class="rounded-xl border border-secondary bg-card p-10">
		<div
			class="mx-auto grid max-w-screen-xl grid-cols-1 items-center justify-between gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		>
			<div class="col-span-full xl:col-span-2">
				<a href="/" class="flex items-center font-bold">
					<enhanced:img src="$lib/assets/logo.svg" alt="Vitaes" class="size-9" />
					<span class="text-2xl">Vitaes</span>
				</a>
			</div>
			<Separator class="col-span-full my-6" />
			<section class="col-span-full">
				<h3>
					{m['landing.footer']()}
					<a
						href="https://github.com/diegopluna"
						target="_blank"
						rel="noopener noreferrer"
						class="ml-1 border-primary text-primary transition-all hover:border-b-2"
					>
						diegopluna
					</a>
				</h3>
			</section>
		</div>
	</div>
</footer>
