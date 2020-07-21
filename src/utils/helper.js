export const dateFormatToday = () => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  const dateString = new Date().toLocaleString('id-ID', dateOptions);

  return dateString;
};
