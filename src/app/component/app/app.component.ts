import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Pomodoro, PomodoroEnum } from 'src/app/store/models';
import { PomodoroState } from 'src/app/store/state';
import { SettingsComponent } from '../settings/settings.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AplicationComponent implements OnInit {

  @Select(PomodoroState.settings) settings$: Observable<Pomodoro>;
  @Select(PomodoroState.getTasks) tasks$: Observable<any>;

  public openIndex: number = 0;
  public showTimer:boolean=true;
  public pomodoroState: string = PomodoroEnum.Pomodoro;
  public PomodoroEnum = PomodoroEnum;
  public settings: any = {
    pomodoro: 0,
    break: 0,
    long: 0,
    interval: 3
  }
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.settings$.subscribe(settings => {
      this.settings = settings
      this.showTimer = false;
      setTimeout(() => this.showTimer=true, 100);
    })
  }


  openSettings(): void {
    const ref: MatDialogRef<SettingsComponent> = this.dialog.open(SettingsComponent, { disableClose: true, width: '60%' });
  }

  manageResponse(type: string) {

    this.settings[type]++;
    switch (type) {
      case PomodoroEnum.Pomodoro:
        this.pomodoroState = PomodoroEnum.Break;
        break;
      case PomodoroEnum.Break:
        this.pomodoroState = (this.settings.pomodoro % this.settings.interval == 0 && this.settings.break % this.settings.interval == 0) ?
          PomodoroEnum.Long : PomodoroEnum.Pomodoro;
        break;
      case PomodoroEnum.Long:
        this.pomodoroState = PomodoroEnum.Pomodoro;
        break;
    }

  }

  addTask() {
    const ref: MatDialogRef<TaskComponent> = this.dialog.open(TaskComponent, { disableClose: true, width: '60%' });
  }

}

