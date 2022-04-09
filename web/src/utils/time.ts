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

export function secondsToTimeWords(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = Math.round(seconds - hours * 3600 - minutes * 60);

  return `${hours ? hours + " hour" + (hours > 1 ? "s" : "") + " " : ""}${
    minutes ? minutes + " minute" + (minutes > 1 ? "s" : "") + " " : ""
  }${secondsLeft + " second" + (secondsLeft > 1 ? "s" : "")}`;
}

export function secondsToTimeWordsRounded(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = Math.round(seconds - hours * 3600 - minutes * 60);

  if (hours) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${secondsLeft} second${secondsLeft > 1 ? "s" : ""}`;
  }
}

export function timeFromNow(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  return secondsToTimeWordsRounded(seconds);
}
