import parse from 'date-fns/parse';
import format from 'date-fns/format';

export const humanizeDate = date => format(parse(date), 'MMMM Do, YYYY');
