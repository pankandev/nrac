<script>
	import Header from './Header.svelte';
	import '../app.scss';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
	</footer>
</div>
