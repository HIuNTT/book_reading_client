export const FormatDay = (inputDateString: string) => {
  const inputDate = new Date(inputDateString);

  const outputDate = inputDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return `${outputDate}`;
};