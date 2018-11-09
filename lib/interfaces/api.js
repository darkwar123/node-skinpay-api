const SkinPayApi = require('../');

SkinPayApi.prototype.getOrderStatus = async function({ key=this.publicKey, orderid}) {
	let response;

	if (typeof orderid === 'undefined') {
		throw new Error('orderid is required');
	}

	let query = { key, orderid };
	let sign = this.makeSign(query);
	response = await this.request({ "httpMethod": 'POST', "iface": 'api', "method":
		'getOrderStatus', "data": Object.assign(query, { sign })});

	return response['data'];
};