import { TimeSpan } from "Types";

let lastValue: number | undefined;
let lastResult: TimeSpan;

export const getTimeSpan = (value: number): TimeSpan => {
  if (lastValue === value) {
    return lastResult;
  }

  const milliseconds = Math.floor((value % 1000) / 10); // <-- round to hundredths for display convenience
  const seconds = Math.floor((value / 1000) % 60);
  const minutes = Math.floor((value / (1000 * 60)) % 60);
  const hours = Math.floor((value / (1000 * 60 * 60)) % 24);
  const days = Math.floor(value / (1000 * 60 * 60 * 24));

  lastResult = {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    ticks: value,
    displayValue: (days > 0 ? days.toString() + "." : "")
      + String(hours).padStart(2, "0") + ":"
      + String(minutes).padStart(2, "0") + ":"
      + String(seconds).padStart(2, "0") + "."
      + String(milliseconds).padStart(2, "0"),
  };

  lastValue = value;

  return lastResult;
};

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise(
    (resolve: { (): void }): void => {
      setTimeout(resolve, milliseconds);
    }
  );
};
