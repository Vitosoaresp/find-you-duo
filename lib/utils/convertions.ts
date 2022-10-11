export function convertHourToMinutos(hour: string) {
  const [hours, minutes] = hour.split(':').map(Number);
  const minutesAmout = hours * 60 + minutes;
  return minutesAmout;
}

export function convertMinutesToHours(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
}
