<script lang="ts">
	import logo from '$lib/assets/logo//DagmawiBabiLogo.png';
	import logo2 from '$lib/assets/logo//DagmawiBabiLogoWhite.png';
	import {
		Instagram,
		Github,
		Linkedin,
		Mail,
		Twitter,
		Send,
		Phone,
		SunIcon,
		MoonIcon
	} from 'lucide-svelte';
	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import config from '$lib/config.json';
	let { showDescription = true, link = '/' } = $props();
</script>

<div class="w-full">
	<div class="flex flex-col rounded py-2 lg:flex-row xl:flex-row 2xl:flex-row">
		<!-- Mobile -->
		<div class="flex items-center justify-between">
			<a href={link}>
				<div class="flex items-center gap-x-2 md:flex lg:hidden xl:hidden 2xl:hidden">
					<img src={mode.current == 'dark' ? logo2 : logo} alt="logo" class="flex w-12" />
					<div class="flex flex-col justify-center">
						<div class="text-xl font-semibold">{config.name}</div>
						<span class="-mt-1">{config.subtitle}</span>
					</div>
				</div>
			</a>
			<Button onclick={toggleMode} variant="ghost" size="icon" class="flex md:hidden">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>

		<!-- PC -->
		<div
			class="flex w-full flex-col justify-center gap-y-1 pt-3 md:gap-y-4 lg:pt-0 xl:pt-0 2xl:pt-0"
		>
			<div class="flex w-full items-center justify-between">
				<!-- Title -->
				<a href={link}>
					<div class="hidden items-center gap-x-2 md:hidden lg:flex xl:flex 2xl:flex">
						<img src={mode.current == 'dark' ? logo2 : logo} alt="logo" class="w-12" />
						<div class="flex flex-col justify-center">
							<div class="text-xl font-semibold">{config.name}</div>
							<span class="-mt-1">{config.subtitle}</span>
						</div>
					</div>
				</a>

				<!-- Socials -->
				<div class="hidden gap-x-2 md:flex">
					<div
						class="flex items-center justify-center gap-x-3 rounded-full border-zinc-300 py-1 text-sm transition-all hover:border-black"
					>
						<a href={config.telegram} target="_blank" rel="noopener noreferrer">
							<Send
								class="cursor-pointer text-sm  text-zinc-700 hover:scale-125 hover:text-cyan-500 dark:text-white dark:hover:text-cyan-500"
								size={20}
							/>
						</a>
						<a href={config.linkedin} target="_blank" rel="noopener noreferrer">
							<Linkedin
								class="cursor-pointer text-sm  text-zinc-700 hover:scale-125 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
								size={20}
							/>
						</a>
						<a href={config.instagram} target="_blank" rel="noopener noreferrer">
							<Instagram
								class="cursor-pointer text-sm  text-zinc-700 hover:scale-125 hover:text-pink-600 dark:text-white dark:hover:text-pink-600"
								size={20}
							/>
						</a>
						<a href={config.twitter} target="_blank" rel="noopener noreferrer">
							<Twitter
								class="cursor-pointer text-sm  text-zinc-700 hover:scale-125 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
								size={20}
							/>
						</a>
						<a href={config.github} target="_blank" rel="noopener noreferrer">
							<Github
								class="hover:text-black-500 cursor-pointer  text-sm text-zinc-700 hover:scale-125 dark:text-white"
								size={20}
							/>
						</a>
						<a href="mailto:{config.email}" target="_blank" rel="noopener noreferrer">
							<Mail
								class="cursor-pointer text-sm  text-zinc-700 hover:scale-125 hover:text-green-500 dark:text-white dark:hover:text-green-500"
								size={20}
							/>
						</a>
						<div class="group/phone cursor-pointer">
							<Phone
								class="text-sm text-zinc-700 hover:scale-125 group-hover/phone:hidden dark:text-white"
								size={20}
							/>
							<span
								class="hidden text-sm font-semibold text-pink-600 hover:scale-125 group-hover/phone:block"
							>
								LOL
							</span>
						</div>
						<Button onclick={toggleMode} variant="ghost" size="icon">
							<SunIcon
								class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
							/>
							<MoonIcon
								class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
							/>
							<span class="sr-only">Toggle theme</span>
						</Button>
					</div>
				</div>
			</div>

			<!-- Description -->
			{#if showDescription}
				<div class="flex flex-col md:gap-y-2">
					<p class="text-sm">
						{config.description}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
