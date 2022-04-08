import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AddTask, EditTask, RemoveTask } from 'src/app/store/actions';
import { Step, Task } from 'src/app/store/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  checkList: Step[] = [];
  taskForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  })

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.taskForm.patchValue({ ...this.data })
      console.log('data', this.data);
      this.checkList = this.data.checklist.map(ch => ({ ...ch }));
    }
  }

  addStep() {
    this.checkList.push({ done: false, label: '' })
  }

  removeStep(index: number) {
    this.checkList.splice(index, 1);
  }

  save() {
    if (this.taskForm.invalid) return;
    const task: Task = { ...this.taskForm.value };
    task.checklist = this.checkList;
    if (!task.id) this.saveTask(task);
    else this.editTask(task);

    this.dialogRef.close()

  }

  editTask(task) {
    this.store.dispatch(new EditTask(task));
  }

  saveTask(task) {
    task.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.store.dispatch(new AddTask(task));
  }


  removeTask() {
    this.store.dispatch(new RemoveTask(this.taskForm.value))
    this.dialogRef.close()
  }
}
