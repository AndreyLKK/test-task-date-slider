interface DateObject {
  [year: number]: Month[];
}

interface Month {
  [month: number]: string;
}

export const month = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export function createObjYear(
  minDate: number,
  maxDate: number,
  month: string[]
): DateObject {
  const result: DateObject = {};
  const trimmedMonth = monthTrimming([...month]);

  for (let year = minDate; year <= maxDate; year++) {
    result[year] = [...trimmedMonth];
  }

  return result;
}

export function createObjMonth(
  dateObject: DateObject,
  minYearWithDate: Date
): DateObject {
  const firstKey = Number(Object.keys(dateObject)[0]);
  const currentStartYear = Math.max(minYearWithDate.getFullYear(), firstKey);

  return {
    [currentStartYear]: dateObject[currentStartYear],
    [currentStartYear + 1]: dateObject[currentStartYear],
    [currentStartYear + 2]: [],
  };
}

export function removingExtraYears(
  containerWidth: HTMLElement | null,
  dateObject: DateObject
): DateObject {
  if (!containerWidth) return dateObject;

  const containerWidthPx = containerWidth.offsetWidth;
  const scrollWidthPx = containerWidth.scrollWidth;

  if (containerWidthPx < scrollWidthPx) {
    const keys = Object.keys(dateObject).map(Number);
    const visibleKeys = keys.filter((_, i) => i % 2 === 0);

    return visibleKeys.reduce((obj, key) => {
      obj[key] = dateObject[key];
      return obj;
    }, {} as DateObject);
  } else {
    return dateObject;
  }
}

export function monthTrimming(trimMonth: string[]): string[] | [] {
  if (!trimMonth) return [];
  return trimMonth
    .map((el) => el.charAt(0).toLowerCase() + el.substr(1, 2))
    .slice(1);
}

export function getFilteredMonths(width: number): string[] {
  if (width > 1118) return [...month];
  if (width <= 560) return month.filter((_, i) => i % 4 === 1);
  if (width <= 830) return month.filter((_, i) => (i + 1) % 3 === 1);
  return month.filter((_, i) => i % 2 !== 1);
}

export function calculateStepValue(obj: DateObject): string {
  const numberOfYears = Object.keys(obj).length - 1;
  const numberOfMonths = 12;
  const numberOfSteps = numberOfMonths * numberOfYears + 0.01;
  return (numberOfSteps > 1 ? 100 / numberOfSteps : 1).toFixed(13);
}
