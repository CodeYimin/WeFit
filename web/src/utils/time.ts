export function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = Math.round(seconds - hours * 3600 - minutes * 60);

  return `${hours ? hours + ":" : ""}${
    minutes
      ? `${minutes < 10 && hours > 0 ? `0${minutes}` : minutes}` + ":"
      : ""
  }${secondsLeft < 10 && minutes > 0 ? `0${secondsLeft}` : secondsLeft}`;
}
