<svelte:head>
    <title>Not Really an Academy</title>
    <meta name="description" content="Open Academy is a free, open-source platform for online learning.">
</svelte:head>

<script lang="ts">
    import './home.scss';
    import {Database} from "../services/db/database";
    import {COLLECTIONS} from "../services/db/collections";
    import {from, map, switchMap} from "rxjs";
    import {DateTime} from "luxon";

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

    $: enrolledCourses$ = from(Database.instance).pipe(
        switchMap(db => db.collection(COLLECTIONS.COURSES).watchQuery()),
        map(querySnapshot => querySnapshot.sort((a, b) => DateTime.fromISO(b.data.lastAccessed).toMillis() - DateTime.fromISO(a.data.lastAccessed).toMillis()))
    );

    $: playlistId = getUrlPlaylistId(url);

    function formatDate(lastAccessed: string): string {
        return DateTime.fromISO(lastAccessed).toFormat('LLL dd, yyyy hh:mm a');
    }
</script>

<section class="playlist-select p-10 flex flex-col items-center justify-center">
    {#if ($enrolledCourses$)}
        <form class="playlist-select-form">
            <div class="logo-wrapper">
                <img src="/images/logo-light.svg" alt="Logo" class="logo"/>
            </div>
            <div class="label-wrapper">
                {#if ($enrolledCourses$.length === 0)}
                    <label for="playlist-select-input">
                        Enter a YouTube playlist URL to get started.
                    </label>
                {:else}
                    <label for="playlist-select-input">
                        Enter a YouTube playlist URL to enroll in a new class or select one of your enrolled classes
                        below.
                    </label>
                {/if}
            </div>
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
        {#if ($enrolledCourses$.length > 0)}
            <div class="enrolled-classes">
                <h3 class="enrolled-classes-title">Enrolled Classes</h3>
                <div class="enrolled-classes-list">
                    {#each $enrolledCourses$ as course}
                        <a
                                href="/class?list={course.data.playlistId}"
                                class="enrolled-class"
                                style="background-image: url({course.data.snippet.thumbnails.maxres.url})"
                        >
                            <div class="enrolled-class-bg"></div>
                            <div class="enrolled-class-title-wrapper">
                                <p class="enrolled-class-title">{course.data.title}</p>
                                <p class="enrolled-class-date"><b>Last accessed:</b> {formatDate(course.data.lastAccessed)}</p>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    {/if}
</section>
