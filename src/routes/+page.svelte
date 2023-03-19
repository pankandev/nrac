<svelte:head>
    <title>Open Academy</title>
    <meta name="description" content="Open Academy is a free, open-source platform for online learning.">
</svelte:head>

<script lang="ts">
    import './home.scss';

    let url = '';

    function getUrlPlaylistId(rawUrl: string): string | null {
        let url: URL;
        try {
            url = new URL(rawUrl);
        } catch (e) {
            return null;
        }
        const urlParams = new URLSearchParams(url.search);
        return urlParams.get('list');
    }

    $: playlistId = getUrlPlaylistId(url);
</script>

<section class="playlist-select p-10 flex flex-col items-center justify-center h-full">
    <img src="/images/logo.svg" alt="Logo" class="w-32 mb-10"/>
    <label for="playlist-select-input">
        Enter a YouTube playlist URL to get started.

        <!--
        https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
        -->
    </label>
    <input
            id="playlist-select-input"
            class="playlist-select-input"
            type="text"
            placeholder="Enter a YouTube playlist URL"
            bind:value={url}
    />
    {#if (playlistId)}
        <a
                class="playlist-select-button"
                href="/class?list={playlistId}"
        >
            Enroll
        </a>
    {/if}
</section>
