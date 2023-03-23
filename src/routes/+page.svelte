<svelte:head>
    <title>Not Really an Academy</title>
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
    <img src="/images/logo-light.svg" alt="Logo" class="w-32 mb-10"/>
    <form class="playlist-select-form">
        <label for="playlist-select-input">
            Enter a YouTube playlist URL to get started.
        </label>
        <div class="playlist-select-input-wrapper">
            <input
                    id="playlist-select-input"
                    class="playlist-select-input"
                    type="text"
                    placeholder="Enter a YouTube playlist URL"
                    bind:value={url}
            />
            {#if (playlistId)}
                <button
                        class="enroll-button"
                        on:click="{() => window.location.href = `/class?list=${playlistId}`}"
                >
                    Enroll
                </button>
            {:else}
                <button
                        class="enroll-button"
                        disabled
                >
                    Enroll
                </button>
            {/if}
        </div>
    </form>
</section>
