<script lang="ts">
    import './notes.scss';
    import {CourseState} from "../../services/courses";
    import {CoursePlayer} from "../../services/youtube";
    import {Observable, of, switchMap} from "rxjs";
    import {OADocument} from "../../services/db/database";
    import type {Note} from "../../models/courses";
    import {Duration} from "luxon";
    import PlayerStates from "youtube-player/dist/constants/PlayerStates";

    let newNote = '';
    let disabled = false;

    export let state: CourseState | null = null;
    export let player: CoursePlayer | null = null;

    async function addNote(event: KeyboardEvent) {
        if (event.key !== 'Enter') {
            return;
        }
        if (!player) {
            return;
        }
        const currentItem = player.currentItem;
        const currentTime = await player.getCurrentTime();
        if (currentItem && state) {
            disabled = true;
            try {
                await state.addNote(newNote, currentItem, currentTime);
                newNote = '';
            } catch (e) {
                console.error(e);
            } finally {
                disabled = false;
            }
            if (wasPlayingBeforeFocus) {
                await player.resume();
            }
            noteInput?.focus();
       }
    }

    let wasPlayingBeforeFocus = false;

    function watchNotes(player: CoursePlayer, state: CourseState): Observable<OADocument<Note>[]> {
        return player.currentItem$().pipe(
            switchMap(item => item ? state.watchNotesOf(item) : of(null)),
        );
    }

    function secondsToTime(secs: number): string {
        return Duration.fromObject({seconds: secs}).toFormat('hh:mm:ss')
    }

    $: notes$ = player && state ? watchNotes(player, state) : of(null);

    async function deleteNote(id: string): Promise<void> {
        if (state) {
            await state.deleteNoteById(id);
        }
    }

    function stringifyDate(postTime: string): string {
        return new Date(postTime).toLocaleString();
    }

    async function onInputFocus() {
        if (player) {
            wasPlayingBeforeFocus = (await player.getStatus()) === PlayerStates.PLAYING;
            await player.pause();
        }
    }

    function onInputBlur() {
        if (wasPlayingBeforeFocus && newNote === '' && player) {
            player.resume();
        }
    }

    let noteInput: HTMLTextAreaElement | null = null;
</script>

{#if state && player && $notes$}
    <div class="notes-container">
        <textarea
                class="notes-textarea"
                placeholder="Type your note here..."
                bind:value={newNote}
                bind:this={noteInput}
                disabled={disabled}
                rows="5"
                on:focus={() => onInputFocus()}
                on:blur={() => onInputBlur()}
                on:keydown={addNote}
        ></textarea>
        <div class="notes">
            {#each $notes$ as note (note.id)}
                <div class="note">
                    <div class="note-body flex mb-2">
                        <div class="note-content flex-grow">{note.data.content}</div>
                        <div class="note-actions">
                            <button class="delete-btn" on:click={() => deleteNote(note.id)}>
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="note-footer">
                        <div class="note-timestamp">{secondsToTime(note.data.videoTimestampSeconds)}</div>
                        <div class="note-date">{stringifyDate(note.data.postTime)}</div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}