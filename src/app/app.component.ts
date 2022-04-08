import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SavePomodoro } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pomodoro';

  constructor(private store: Store) { }
  ngOnInit(): void {
    const settings = localStorage.getItem('pomodoro');
    if (settings) this.store.dispatch(new SavePomodoro(JSON.parse(settings)))

    this.store.subscribe(state => {
      localStorage.setItem('pomodoro', JSON.stringify(state.pomodoro))
    })

  }
}
