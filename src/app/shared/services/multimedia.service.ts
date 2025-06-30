import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  //Este servicio se utiliza para gestionar operaciones multimedia, como la reproducción de audio, vídeo, etc.
  // Utiliza un EventEmitter para comunicarse con otros componentes o servicios.
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPorcentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe((responseOk) => {
      if (responseOk) {
        this.setAudio(responseOk);
      }
    });
    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'play':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
        break;
    }
  };

  private calculateTime = () => {
    // console.log('Calculando tiempo de reproducción');
    const { currentTime, duration } = this.audio;
    // console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPorcentage(currentTime, duration);
  };

  private setPorcentage = (currentTime: number, duration: number): void => {
    if (duration > 0) {
      const percentage = (currentTime / duration) * 100;
      this.playerPorcentage$.next(percentage);
    }
  };

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let seconds = Math.floor((duration - currentTime) % 60);
    let minutes = Math.floor(((duration - currentTime) / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  //Funciones publicas
  public setAudio(track: TrackModel): void {
    console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑 setAudio', track);
    this.audio.src = track.url ?? '';
    this.audio.play();
  }

  public togglePlayer(): void {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
