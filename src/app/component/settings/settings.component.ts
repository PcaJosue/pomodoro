import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SavePomodoro, SetTime } from 'src/app/store/actions';
import { PomodoroState } from 'src/app/store/state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public form: FormGroup = new FormGroup({

    autoStartBreaks: new FormControl(false),
    autoStartPomodoro: new FormControl(false),
    longBreakMinutes: new FormControl(15, Validators.required),
    shortBreakMinutes: new FormControl(5, Validators.required),
    pomodoroMinutes: new FormControl(45, Validators.required),
    longBreakInterval: new FormControl(3, Validators.required),
    alarm: new FormControl(true),

  });




  constructor(private store: Store, private dialogRef: MatDialogRef<SettingsComponent>) { }

  ngOnInit(): void {

    this.store.select(PomodoroState.settings).subscribe(settings => {
      this.form.patchValue({ ...settings })
    })
  }

  save() {
    if (this.form.invalid) return;
    this.store.dispatch(new SavePomodoro(this.form.value))
    this.dialogRef.close();
  }
}
