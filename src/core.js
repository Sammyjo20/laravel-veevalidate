"use strict";

/**
 * Check if the given status is 422 (Unprocessable Entity)
 *
 * @param status
 * @returns {boolean}
 */
function validStatus(status) {
    return status === 422;
}

/**
 * Display a warning
 *
 * @param message
 */
function warning(message = 'Unknown Warning.') {
    console.warn('[Laravel-VeeValidate Warning] ' + message);
}

/**
 * Display a fatal error
 *
 * @param message
 */
function fatalError(message = 'Unknown Error.') {
    console.error('[Laravel-VeeValidate Fatal Error] ' + message);
}

/**
 * Validate our field map
 *
 * @param field_map
 * @returns {boolean}
 */
function validFieldMap(field_map) {
    let keys = Object.keys(field_map);
    let dup_keys = [];
    let dup_values = [];

    if (keys.length <= 0) {
        return false;
    }

    for(let i = 0; i < keys.length; i++) {
        let value = field_map[keys[i]];

        if (!value) {
            return false;
        }

        if (dup_values.includes(value)) {
            return false;
        }

        if (dup_keys.includes(value)) {
            return false;
        }

        dup_values.push(value);
        dup_keys.push(keys[i]);
    }

    return true;
}

/**
 * Check if the response has any errors.
 *
 * @param data
 * @returns {boolean}
 */
function responseHasErrors(data) {
    if (!data || data.length <= 0) {
        return false;
    }

    if (!data.errors || data.errors.length <= 0) {
        return false;
    }

    return true;
}

/**
 * Process all dem errors.
 *
 * @param validator
 * @param errors
 * @param field_map
 */
function errorProcessor(validator, errors, field_map) {

    let keys = Object.keys(errors);
    let field_keys = Object.keys(field_map);

    for(let i = 0; i < keys.length; i++) {
        let field = null;

        if (field_keys.includes(keys[i])) {
            field = field_map[keys[i]];
        } else {
            field = keys[i];
        }

        if (!field) {
            continue;
        }

        errors[keys[i]].forEach(msg => {
            validator.errors.add({
                field,
                msg
            });
        });
    }
}

module.exports = {
    validStatus,
    warning,
    fatalError,
    validFieldMap,
    responseHasErrors,
    errorProcessor
};