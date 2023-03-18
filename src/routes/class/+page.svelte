<script lang="ts">
    import './class-layout.scss';
    import {onMount} from 'svelte';
    import {PlaylistPlayer, YoutubePlaylist} from "../../services/youtube.ts";

    let container: HTMLDivElement | null = null;
    let player: PlaylistPlayer | null = null;
    $: isPlaying$ = player?.isPlaying$();
    $: items$ = player?.items$();
    let loaded = false;

    async function init() {
        if (!container) {
            console.warn('Container not found');
            loaded = true;
            return;
        }

        const searchParams = new URLSearchParams(window.location.search);
        const playlistId = searchParams.get('list');
        if (!playlistId) {
            console.warn('Playlist ID not found');
            loaded = true;
            return;
        }
        const playlist = new YoutubePlaylist(playlistId);
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

<section class="class-container flex flex-row h-full">
    <div class="playlist-content flex flex-col flex-grow">
        <div class="playlist-content-player" id="player" bind:this={container}>
        </div>
        {#if (loaded)}
            <div class="playlist-content-controls flex flex-row justify-center items-center">
                {#if (player)}
                    <div class="flex flex-row justify-center">
                        <button class="player-controls-btn" on:click={previous(player)}>
                            <i class="fas fa-step-backward"></i>
                        </button>

                        <div class="mx-2">
                            {#if ($isPlaying$)}
                                <button class="player-controls-btn" on:click={pause(player)}>
                                    <i class="fas fa-pause"></i>
                                </button>
                            {:else}
                                <button class="player-controls-btn" on:click={resume(player)}>
                                    <i class="fas fa-play"></i>
                                </button>
                            {/if}
                        </div>

                        <button class="player-controls-btn" on:click={next(player)}>
                            <i class="fas fa-step-forward"></i>
                        </button>
                    </div>
                {/if}

            </div>
            <div class="playlist-content-title flex flex-row justify-start items-center m-1 ml-3">
                {player.currentItem.snippet.title}
            </div>
        {:else}
            <div>Loading...</div>
        {/if}
    </div>
    <div class="playlist-items flex flex-col items-center">
        {#if (loaded)}
            <div class="playlist-items-list flex flex-col">
                {#if ($items$)}
                    {#each $items$ as item}
                        <button
                                class="playlist-items-list-item flex flex-row justify-start items-center m-1"
                                class:active={item.id === player.currentItem.id}
                                on:click={() => player.playVideo(item.id)}
                        >
                            {item.snippet.title}
                        </button>
                    {/each}
                {/if}
            </div>
        {:else}
            <div>Loading...</div>
        {/if}
    </div>
</section>
