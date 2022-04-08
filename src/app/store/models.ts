export interface Pomodoro {
    autoStartBreaks: boolean,
    autoStartPomodoro: boolean,
    longBreakMinutes: number,
    shortBreakMinutes: number,
    pomodoroMinutes: number,
    longBreakInterval: number,
    alarm: boolean,
    time: string,
    tasks: Task[]
}

export interface Task {
    id: string,
    name: string,
    description: string,
    checklist: Step[]
}

export interface Step {
    done: boolean,
    label: string
}

export const PomodoroEnum = {
    'Pomodoro': 'pomodoro',
    'Break': 'break',
    'Long': 'long'
}