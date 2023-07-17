import { ServiceIdentifier } from "@config";
import { IDateTimeService } from "@services/DateTime";
import { ILoggerService } from "@services/Logger";
import { inject, injectable } from "inversify";
import { IStopwatchService } from "./IStopwatchService";
import { StopwatchTickEvent } from "./StopwatchTickEvent";
import { StopwatchTickEventArgs } from "./StopwatchTickEventArgs";

@injectable()
export class StopwatchService implements IStopwatchService {

  private readonly _interval = 25;

  private readonly _loggerService: ILoggerService;

  private readonly _dateTimeService: IDateTimeService;

  private _id: number | undefined;

  private _elapsed: number = 0;

  private _tickListeners: Array<StopwatchTickEvent> = [];

  private _start: number = 0;

  public get elapsed(): number {
    return this._elapsed;
  }

  constructor(
    @inject(ServiceIdentifier.DateTimeService) dateTimeService: IDateTimeService,
    @inject(ServiceIdentifier.LoggerService) loggerService: ILoggerService
  ) {
    this._dateTimeService = dateTimeService;
    this._loggerService = loggerService;

    this.timerHandler = this.timerHandler.bind(this);
  }

  public start(): void {
    this._loggerService.debug(
      StopwatchService.name,
      this.start.name,
      "interval",
      this._interval
    );

    if (this._id) {
      clearInterval(this._id);
    }

    this._id = setInterval(this.timerHandler, this._interval);
    this._start = this._dateTimeService.now.getTime();
  }

  public stop(): void {
    this._loggerService.debug(
      StopwatchService.name,
      this.stop.name,
      "id",
      this._id
    );

    if (this._id) {
      clearInterval(this._id);
    }

    this._id = undefined;
  }

  public reset(): void {
    this._loggerService.debug(
      StopwatchService.name,
      this.reset.name,
      "elapsed",
      this._elapsed
    );

    this._elapsed = 0;
    this._start = this._dateTimeService.now.getTime();
  }

  public addTickListener(callback: StopwatchTickEvent): void {
    this._loggerService.debug(
      StopwatchService.name,
      this.addTickListener.name
    );

    this._tickListeners.push(callback);
  }

  public removeTickListener(callback: StopwatchTickEvent): void {
    this._loggerService.debug(
      StopwatchService.name,
      this.removeTickListener.name
    );

    const index = this._tickListeners.indexOf(callback);

    if (index === -1) {
      throw new Error("Listener not found.");
    }

    this._tickListeners.splice(index, 1);
  }

  private timerHandler(): void {
    const elapsed = this._elapsed + (this._dateTimeService.now.getTime() - this._start);
    this._elapsed = elapsed;
    this._start = this._dateTimeService.now.getTime();

    const milliseconds = Math.floor((elapsed % 1000) / 10); // <-- round to hundredths for display convenience
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

    const eventArgs: StopwatchTickEventArgs = {
      ticks: elapsed,
      timeSpan: {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        displayValue: (days > 0 ? days.toString() + "." : "")
          + String(hours).padStart(2, "0") + ":"
          + String(minutes).padStart(2, "0") + ":"
          + String(seconds).padStart(2, "0") + "."
          + String(milliseconds).padStart(2, "0"),
      },
    };

    for (const listener of this._tickListeners) {
      listener(eventArgs);
    }
  }

}