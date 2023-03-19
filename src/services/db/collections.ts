import type {Course, CourseItem, Note} from "../../models/courses";
import {CollectionKey} from "./database";

export const COLLECTIONS = {
    COURSES: new CollectionKey<Course>('courses'),
    COURSE_ITEMS: new CollectionKey<CourseItem>('courses-items'),
    NOTES: new CollectionKey<Note>('notes'),
}
