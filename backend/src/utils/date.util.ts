export const getMonthRange = (month: string) => {
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  return { startDate, endDate };
};

export const getYearRange = (year: string) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${Number(year) + 1}-01-01`);

  return { startDate, endDate };
};