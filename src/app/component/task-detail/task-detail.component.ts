import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { EditTask } from 'src/app/store/actions';
import { Task } from 'src/app/store/models';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task;
  @Input() opened: boolean;
  @Input() index: number;
  @Output() onOpen = new EventEmitter();

  constructor(private dialog: MatDialog,
    private store: Store) { }

  ngOnInit(): void {
  }

  editTask() {
    const ref: MatDialogRef<TaskComponent> = this.dialog.open(TaskComponent, { disableClose: true, width: '60%', data: this.task });
  }

  send() {
    this.onOpen.emit(true);
  }

  changeStep(event, index) {

    const task: Task = { ...this.task };
    const checklist = task.checklist.map(s => ({ ...s }));
    checklist[index].done = event.checked;
    task.checklist = checklist;

    this.store.dispatch(new EditTask(task));

  }

}
