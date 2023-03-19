<script lang="ts">
    import {CoursePlayer} from "../../services/youtube";
    import {CourseState} from "../../services/courses";
    import {EMPTY} from "rxjs";

    export let player: CoursePlayer | null = null;
    export let course: CourseState | null = null;
    $: currentItem$ = (player as CoursePlayer)?.currentItem$() ?? EMPTY;

    $: loaded = !!player && !!course;

    $: items$ = (course as CourseState)?.watchItems();
</script>

<div class="playlist-items flex flex-col items-center">
    {#if (loaded)}
        <div class="playlist-items-list flex flex-col">
            {#if ($items$)}
                {#each $items$ as item}
                    {#if $currentItem$}
                        <button
                                class="playlist-items-list-item flex flex-row justify-start items-center m-1"
                                class:active={item.id === $currentItem$.videoId}
                                on:click={() => player.playVideo(item.id)}
                        >
                            {item.data.snippet.title}
                        </button>
                    {/if}
                {/each}
            {/if}
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
</div>
