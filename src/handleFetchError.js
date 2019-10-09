"use strict";

const handleError = require('./handleError.js');

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
function handleFetchError(validator, response, field_map, options) {
    if (!field_map) {
        field_map = {};
    }

    if (!options) {
        options = {};
    }

    options['driver'] = 'fetch';
    return handleError(validator, response, field_map, options);
}

module.exports = handleFetchError;
