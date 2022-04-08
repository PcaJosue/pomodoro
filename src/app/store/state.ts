import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTask, EditTask, RemoveTask, SavePomodoro, SetTime } from "./actions";
import { Pomodoro, Task } from "./models";

@State<Pomodoro>({
    name: 'pomodoro',
    defaults: {
        autoStartBreaks: false,
        autoStartPomodoro: false,
        longBreakMinutes: 15,
        shortBreakMinutes: 5,
        pomodoroMinutes: 45,
        longBreakInterval: 3,
        alarm: true,
        time: '00:00',
        tasks: []
    }
})
@Injectable()
export class PomodoroState {


    @Selector()
    static settings(state: Pomodoro) {
        return state;
    }

    @Selector()
    static getTime(state: Pomodoro) {
        return state.time;
    }

    @Selector()
    static getTasks(state: Pomodoro) {
        return state.tasks;
    }


    @Action(SavePomodoro)
    onSavePomodoro(ctx: StateContext<Pomodoro>, action: SavePomodoro) {
        const state = ctx.getState();
        ctx.setState({
            ...action.info
        });

    }

    @Action(SetTime)
    onSetTime(ctx: StateContext<Pomodoro>, action: SetTime) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            time: action.time
        });
    }

    @Action(AddTask)
    onAddTask(ctx: StateContext<Pomodoro>, action: AddTask) {
        const state = ctx.getState();
        const tasks: Task[] = [...state.tasks, action.task];
        ctx.setState({
            ...state,
            tasks: tasks
        });
    }


    @Action(EditTask)
    onEditTask(ctx: StateContext<Pomodoro>, action: EditTask) {
        const state = ctx.getState();
        const tasks: Task[] = [...state.tasks];
        const index = tasks.findIndex(t => t.id === action.task.id);
        tasks[index] = action.task;

        ctx.setState({
            ...state,
            tasks: tasks
        });
    }


    @Action(RemoveTask)
    onRemoveTask(ctx: StateContext<Pomodoro>, action: RemoveTask) {
        const state = ctx.getState();
        const tasks: Task[] = state.tasks.filter(t => t.id !== action.task.id)
        ctx.setState({
            ...state,
            tasks: tasks
        });
    }



}