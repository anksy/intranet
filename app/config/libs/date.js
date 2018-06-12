'use strict';

const moment = require('moment');
module.exports = {
	timestamp : () => {
		return moment().format("x");
	},
	format : (format) => {
		return moment().format(format);
	},
	formatDate : (date,format) => {
		return moment(new Date(date)).format(format);
	},
	isValid : (date) =>{
		return moment(new Date(date)).isValid();
	},
	dateRef : (date) => {
		return new Date(date);
	},
	lessThanToday : (date) => {
		let today = new Date(), future = new Date(date);
		if(today<=future){
			return false;
		}
		return true;
	},
	utc2gmt : (date) => {
		return moment.utc(new Date(date)).toDate().toString();
	},
	futureDate : (date, format, d, type) => {
		// type 
		// d = date
		// m = minute
		return moment(date).add(d, type).format(format);
	},
};