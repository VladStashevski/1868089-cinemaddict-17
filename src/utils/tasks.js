import dayjs from 'dayjs';

const humanizeDueDate = (dueDate) => dayjs(dueDate).format('YYYY');

export {humanizeDueDate};
