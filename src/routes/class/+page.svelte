<script lang="ts">
    import {onMount} from 'svelte';
    import {PlaylistPlayer, YoutubePlaylist} from "../../services/youtube.ts";

    let container: HTMLDivElement | null = null;
    let player: PlaylistPlayer | null = null;
    $: isPlaying$ = player?.isPlaying$();
    let loaded = false;

    async function init() {
        if (!container) {
            console.warn('Container not found');
            loaded = true;
            return;
        }
        const playlist = new YoutubePlaylist('PL4ZKZLiSWIFbcbUxMyKyPr_3S67IYoSXa');
        if (!playlist) {
            console.warn('Playlist not found');
            loaded = true;
            return;
        }
        player = await PlaylistPlayer.create(container, playlist);
        loaded = true;
    }

    onMount(async () => {
        await init();
    });

    function refreshPlayer(): void {
        player = player;
    }

    async function previous(player: PlaylistPlayer): Promise<void> {
        await player.playPrevious();
        refreshPlayer();
    }

    async function next(player: PlaylistPlayer): Promise<void> {
        await player.playNext();
        refreshPlayer();
    }

    async function pause(player: PlaylistPlayer): Promise<void> {
        await player.pause();
        refreshPlayer();
    }

    async function resume(player: PlaylistPlayer): Promise<void> {
        await player.resume();
        refreshPlayer();
    }
</script>

<section class="flex flex-col">
    Playlist
    <div id="player" bind:this={container}>
    </div>
    {#if (loaded)}
        {#if (player)}
            {player.currentItem.snippet.title}
            <div class="flex flex-row justify-center">
                <button class="btn" on:click={previous(player)}>Previous</button>

                <div class="mx-2">
                    {#if ($isPlaying$)}
                        <button class="btn" on:click={pause(player)}>Pause</button>
                    {:else}
                        <button class="btn" on:click={resume(player)}>Play</button>
                    {/if}
                </div>

                <button class="btn" on:click={next(player)}>Next</button>
            </div>
        {/if}
    {:else}
        <div>Loading...</div>
    {/if}
</section>
