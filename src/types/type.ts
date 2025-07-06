export interface Habit {
    id: string;
    title: string;
    description: string;
    goal: string;
}
export interface Report {
    total: number;
    completed: number;
    pending: number;
    progress: string;
}