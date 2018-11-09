const SkinPayApi = require('../');
const querystring = require('querystring');

SkinPayApi.prototype.depositResult = function(query) {
	const params = query || {};
	const sign = this.makeSign(params);

	return query['status'] === 'success' && String(params['sign']).toLowerCase() === sign.toLowerCase();
};

SkinPayApi.prototype.depositCreate = function({ key=this.publicKey, orderid, userid,
																								currency, currency_rate, min_amount }) {
	if (typeof userid === 'undefined') {
		throw new Error('userid is required');
	}

	userid = String(userid);
	orderid = typeof orderid === 'undefined' ?
		String(Math.random()).replace('0.', '').substr(0, 15).replace(/^0+(\d+)$/i, '$1')
		: String(orderid);

	let query = { key, userid, orderid };

	if (typeof currency !== 'undefined') {
		query['currency'] = currency;
	}

	if (typeof currency_rate !== 'undefined') {
		query['currency_rate'] = currency_rate;
	}

	if (typeof min_amount !== 'undefined') {
		query['min_amount'] = min_amount;
	}

	let sign = this.makeSign(query);

	return 'https://skinpay.com/deposit?' + querystring.encode(Object.assign(query, { sign }));
};