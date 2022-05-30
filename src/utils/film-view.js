import dayjs from 'dayjs';

const getReleaseYear = (releaseDate) => dayjs(releaseDate).format('YYYY');

const humanizeReleaseDate = (releaseDate) => dayjs(releaseDate).format('DD MMM YYYY');

const humanizeRuntime = (minutes) => `${String((minutes / 60).toFixed(2)).replace(/\./gi, 'h ')  }m`;

export {getReleaseYear, humanizeReleaseDate, humanizeRuntime};
