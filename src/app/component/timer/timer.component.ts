import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { SetTime } from 'src/app/store/actions';
import { PomodoroEnum } from 'src/app/store/models';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() min = 0;
  @Input() type: string = '';
  @Output() onResponse: any = new EventEmitter();
  @Input() autoStart: boolean = false;
  @Input() notificationEnabled: boolean = false;

  public size: string = '450';
  private futureDate: Date = new Date();
  public timer: string = '';
  public timeDifference: number = 0;
  public total: number = 0;
  public progress: number = 0;
  private interval: any;
  public running: boolean = false;
  public color: string = '';
  constructor(private store: Store, private titleService: Title,
    public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.observeBreakPoints();
    this.color = this.getColor();
    this.futureDate = new Date(this.min * 60 * 1000);
    this.timer = `${this.min}:00`;
    this.total = this.min * 60 * 1000;
    this.progress = 100;

    if (this.autoStart)
      this.play();

  }

  observeBreakPoints() {
    this.breakpointObserver
      .observe(['(max-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        this.size = state.matches ? '300' : '450';
      });
  }

  getColor() {
    switch (this.type) {
      case PomodoroEnum.Pomodoro:
        return 'primary';
      case PomodoroEnum.Break:
        return 'accent';
      case PomodoroEnum.Long:
        return 'warn';
      default:
        return 'primary';
    }
  }

  play(): void {

    this.running = true;
    if (this.timeDifference > 0) {
      this.futureDate = new Date(new Date().getTime() + this.timeDifference)
      this.timeDifference = 0;
    } else {
      const miliseconds = (this.min * 60 * 1000);
      this.futureDate = new Date(new Date().getTime() + miliseconds)
    }
    this.setTime();

  }

  setTime() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const restTime = this.futureDate.getTime() - new Date().getTime();
      if (restTime < 0) {
        clearInterval(this.interval);
        this.progress = 100;
        this.running = false;
        this.timer = `${this.min}:00`;
        this.onResponse.emit(this.type)
        this.playNotification();
      } else {
        this.progress = (restTime / this.total) * 100;
        this.timer = this.milisecondsToMinutes(restTime);
      }
    }, 50)
  }

  restart() {
    this.running = false;
    clearInterval(this.interval);
    this.timer = `${this.min}:00`;
    this.titleService.setTitle(`Pomodoro`)
    this.timeDifference = 0;
    this.progress = 100;

  }


  pausePomodoro() {
    this.running = false;
    this.timeDifference = this.futureDate.getTime() - new Date().getTime();
    clearInterval(this.interval);
  }

  addZeros(value: number) {
    return value < 10 ? "0" + value : value;
  }

  milisecondsToMinutes(milisenconds: number) {
    const minutes: number = parseInt((milisenconds / 1000 / 60).toString());
    milisenconds -= minutes * 60 * 1000;
    const seconds: number = milisenconds / 1000;
    const time = `${this.addZeros(minutes)}:${this.addZeros(+seconds.toFixed(1))}`
    this.titleService.setTitle(`Pomodoro ${time}`)
    return time;
  };


  playNotification() {
    if (this.notificationEnabled) {
      const audio: HTMLAudioElement = new Audio('../../../assets/sounds/serious-strike-533.ogg')
      audio.play();
    }

  }

}

