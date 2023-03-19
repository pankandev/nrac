<script lang="ts">
    import './notes.scss';
    import {CourseState} from "../../services/courses";

    let newNote = '';

    export let state: CourseState | null = null;
</script>

{#if state}
    <div class="notes-container">
        <textarea
                class="notes-textarea"
                placeholder="Type your note here..."
                bind:value={newNote}
                rows="5"
        ></textarea>
        <div class="notes">
            <div class="note">
                <div class="note-body">
                    <div class="note-content">Text</div>
                </div>
                <div class="note-footer">
                    <div class="note-timestamp">Timestamp</div>
                    <div class="note-date">Date</div>
                </div>
            </div>
            <div class="note">
                <div class="note-body">
                    <div class="note-content">Text</div>
                </div>
                <div class="note-footer">
                    <div class="note-timestamp">Timestamp</div>
                    <div class="note-date">Date</div>
                </div>
            </div>
            <div class="note">
                <div class="note-body">
                    <div class="note-content">Text</div>
                </div>
                <div class="note-footer">
                    <div class="note-timestamp">Timestamp</div>
                    <div class="note-date">Date</div>
                </div>
            </div>
            <div class="note">
                <div class="note-body">
                    <div class="note-content">Text</div>
                </div>
                <div class="note-footer">
                    <div class="note-timestamp">Timestamp</div>
                    <div class="note-date">Date</div>
                </div>
            </div>
            <div class="note">
                <div class="note-body">
                    <div class="note-content">Text</div>
                </div>
                <div class="note-footer">
                    <div class="note-timestamp">Timestamp</div>
                    <div class="note-date">Date</div>
                </div>
            </div>
        </div>
    </div>
{/if}