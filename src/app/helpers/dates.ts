export default function fixDates(date: Date): string
{
    const newDate = new Date(date);

    return (
        [
          padTo2Digits(newDate.getMonth() + 1),
          padTo2Digits(newDate.getDate()),
          newDate.getFullYear()
        ].join('-'));
}

function padTo2Digits(num: number)
{
    return num.toString().padStart(2, '0');
}