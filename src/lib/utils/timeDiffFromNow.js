import moment from 'moment';
import divider from '../../components/divider';

const YEAR = 365 * 24 * 60 * 60.0;
const MONTH = 30 * 24 * 60 * 60.0;
const WEEK = 7 * 24 * 60 * 60.0;
const DAY = 24 * 60 * 60.0;
const HOUR = 60 * 60.0;
const MIN = 60.0;

const dividers = [YEAR, MONTH, WEEK, DAY, HOUR, MIN];
const suffix = ['y', 'mo', 'w', 'd', 'h', 'm'];

export default (datetime) => {
    let delta = moment.utc().format('X') - moment.utc(datetime).format('X');
    
    for(var i = 0; i < dividers.length; i++){
        let quocent = delta / dividers[i];
        if(quocent > 1){
            return `${Math.floor(quocent)}${suffix[i]}`;
        }
    }

    return 'now';
};

