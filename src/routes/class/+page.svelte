<script lang="ts">
    import './class-layout.scss';
    import {onMount} from 'svelte';
    import {CoursePlayer, YoutubePlaylist} from "../../services/youtube.ts";
    import PlaylistItems from "./PlaylistItems.svelte";
    import {CourseState} from "../../services/courses";
    import Notes from './Notes.svelte';
    import type {CourseItem} from "../../models/courses";

    let container: HTMLDivElement | null = null;
    let player: CoursePlayer | null = null;
    let course: CourseState | null = null;
    $: isPlaying$ = (player as CoursePlayer)?.isPlaying$();

    $: hasPrevious$ = (player as CoursePlayer)?.hasPrevious$();
    $: hasNext$ = (player as CoursePlayer)?.hasNext$();
    $: currentItem$ = (player as CoursePlayer)?.currentItem$();

    let loaded = false;

    async function init(): Promise<void> {
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
        course = new CourseState(playlist);
        const enrolled = await course.enroll();
        if (!enrolled) {
            console.warn('Course not enrolled');
            loaded = true;
            return;
        }
        player = await CoursePlayer.create(container, course);
        loaded = true;
    }

    onMount(async () => {
        await init();
    });

    function refreshPlayer(): void {
        player = player;
    }

    async function previous(player: CoursePlayer): Promise<void> {
        await player.playPrevious();
        refreshPlayer();
    }

    async function next(player: CoursePlayer, item?: CourseItem): Promise<void> {
        if (item && course) {
            await course.markAsCompleted(item.videoId);
        }
        await player.playNext();
        refreshPlayer();
    }

    async function pause(player: CoursePlayer): Promise<void> {
        await player.pause();
        refreshPlayer();
    }

    async function resume(player: CoursePlayer): Promise<void> {
        await player.resume();
        refreshPlayer();
    }
</script>

<svelte:head>
    <title>Open Academy - Class</title>
    <meta name="description" content="Open Academy is a free, open-source platform for online learning.">
</svelte:head>

<section class="class-container flex flex-row h-full">
    <div class="playlist-content flex flex-col flex-grow">
        <div class="playlist-content-player" id="player">
            <div bind:this={container}></div>
        </div>
        {#if ($currentItem$)}
            <div class="playlist-content-title flex flex-row justify-center items-center">
                {$currentItem$.title}
            </div>
        {/if}
        {#if (loaded)}
            <div class="playlist-content-controls flex flex-row justify-center items-center">
                {#if (player)}
                    <div class="flex flex-row justify-center">

                        <button class="player-controls-btn" on:click={previous(player)} disabled='{!$hasPrevious$}'>
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

                        {#if ($currentItem$)}
                            {#if ($currentItem$.completed)}
                                <button class="player-controls-btn" on:click={next(player)} disabled='{!$hasNext$}'>
                                    <i class="fas fa-step-forward"></i>
                                </button>
                            {:else}
                                <button class="player-controls-btn completed" on:click={next(player, $currentItem$)}
                                        disabled='{!$hasNext$}'>
                                    <i class="fas fa-check"></i>
                                </button>
                            {/if}
                        {/if}
                    </div>
                {/if}
            </div>
            <div class="playlist-content-notes flex flex-row justify-center items-center">
                <Notes state={course}></Notes>
            </div>
        {:else}
            <div>Loading...</div>
        {/if}
    </div>
    <PlaylistItems player={player} course={course}/>
</section>
