const Ut_validator = require('validatorjs');
const ut_validator = async (body, rules, customMessages, callback) => {
    const ut_validation = new Ut_validator(body, rules, customMessages);
    ut_validation.passes(() => callback(null, true));
    ut_validation.fails(() => callback(ut_validation.errors, false));
};
module.exports = ut_validator;