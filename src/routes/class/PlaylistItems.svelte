<script lang="ts">
    import {CoursePlayer} from "../../services/youtube";
    import {CourseState} from "../../services/courses";
    import {EMPTY} from "rxjs";

    export let player: CoursePlayer | null = null;
    export let course: CourseState | null = null;
    $: currentItem$ = (player as CoursePlayer)?.currentItem$() ?? EMPTY;

    $: loaded = !!player && !!course;

    $: items$ = (course as CourseState)?.watchItems() ?? EMPTY;
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
                                class:completed={item.data.completed}
                        >
                            <span class="flex flex-grow">
                                {item.data.title}
                            </span>
                            {#if item.data.completed}
                                <button class="progress-switch completed" on:click|stopPropagation={() => course?.markAsNotCompleted(item.id)}>
                                    <i class="fas fa-check text-green-500"></i>
                                </button>
                            {/if}
                            {#if !item.data.completed}
                                <button class="progress-switch" on:click|stopPropagation={() => course?.markAsCompleted(item.id)}>
                                    <i class="fas fa-check text-white"></i>
                                </button>
                            {/if}
                        </button>
                    {/if}
                {/each}
            {/if}
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
</div>
