/*
 * The post date is a plain calendar day ("2026-05-12"), so it must be printed
 * in UTC: the local zone would put it on the previous day for every reader
 * west of Greenwich, and the server and the browser would disagree.
 */
const FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})

export function formatDate(date: string | Date) {
  return FORMAT.format(new Date(date))
}
