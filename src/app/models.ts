export interface DraftToDo {
    todo: string;
    date: string;
}

export interface ToDo extends DraftToDo {
    userId: string;
    isDone: boolean;
    id: string;
}