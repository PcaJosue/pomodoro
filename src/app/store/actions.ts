import { Pomodoro, Task } from "./models";

export class SavePomodoro {
    static readonly type = '[Pomodoro] save';
    constructor(public info: Pomodoro) { }
}


export class SetTime {
    static readonly type = '[Pomodoro] setTime';
    constructor(public time: string) { }

}


export class AddTask {
    static readonly type = '[Pomodoro] addTask';
    constructor(public task: Task) { }
}


export class EditTask {
    static readonly type = '[Pomodoro] editTask';
    constructor(public task: Task) { }
}

export class RemoveTask {
    static readonly type = '[Pomodoro] removeTask';
    constructor(public task: Task) { }

}