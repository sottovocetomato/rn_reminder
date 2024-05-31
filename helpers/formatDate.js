export function getHoursMinutes(date) {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours}:${minutes}`;
}
