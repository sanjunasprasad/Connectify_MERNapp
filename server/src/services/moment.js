import moment from 'moment';

export const formatDate = async (date) => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    return formattedDate
}