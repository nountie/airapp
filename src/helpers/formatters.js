export function kelvinToCelsius(temperature) {
  return Math.round(Number(temperature) - 273.15);
}

export function date(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString("pl");
}

export function retrieveHours(datetext) {
  return datetext.match(/([0-9][0-9]:[0-9][0-9]):[0-9][0-9]/)[1];
}
