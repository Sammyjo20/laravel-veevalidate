"use strict";

const { validStatus, warning, fatalError, validFieldMap, responseHasErrors, errorProcessor } = require('./core.js');

/**
 *
 * Handle an error.
 *
 * @param validator
 * @param response
 * @param field_map
 * @param options
 * @returns {void|*}
 */
function handleError(validator, response, field_map = {}, options = {}) {

    response = response.response;

    if (!validator) {
        return fatalError('VeeValidate instance not found.');
    }

    if (!response) {
        return fatalError('Response empty.');
    }

    if (Object.keys(field_map).length > 0 && !validFieldMap(field_map)) {
        return fatalError('Your field map was not valid.');
    }

    if (!validStatus(response.status)) {
        if (response.status === 403) {
            return warning('Response was not authorized.');
        }

        return warning('Response status did not meet expectations. Expecting: 422');
    }

    if (!responseHasErrors(response.data)) {
        return warning('Response did not contain any Laravel errors.');
    }

    errorProcessor(validator, response.data.errors, field_map);

    // Boom.
}

module.exports = handleError;