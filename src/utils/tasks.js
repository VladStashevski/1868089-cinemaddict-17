import dayjs from 'dayjs';

const humanizeDueDate = (dueDate) => dayjs(dueDate).format('YYYY');

const sortFilmsByRating = (filmA, filmB) => (filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

const sortFilmsByDate = (filmA, filmB) => (dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date)));

export {humanizeDueDate, sortFilmsByRating, sortFilmsByDate};
