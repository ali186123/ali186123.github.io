import { StopwatchTickEvent } from "./StopwatchTickEvent";

export interface IStopwatchService {

  readonly elapsed: number;

  readonly hasOffset: boolean;

  readonly isRunning: boolean;

  set(elapsed: number): void;

  start(): void;

  stop(): void;

  reset(): void;

  snap(): void;

  setOffset(): void;

  clearOffset(): void;

  /**
   * Forces a tick and invokes attached handlers.
   */
  tick(): Promise<void>;

  addTickListener(callback: StopwatchTickEvent): void;

  removeTickListener(callback: StopwatchTickEvent): void;

}
