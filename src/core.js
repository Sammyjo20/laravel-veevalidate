/**
 * Check if the given status is 422 (Unprocessable Entity)
 *
 * @param status
 * @returns {boolean}
 */
export function validStatus(status) {
    return status === 422;
}

/**
 * Display a warning
 *
 * @param message
 * @param display
 */
export function warning(message, display) {
    if (!message) {
        message = 'Unknown Warning';
    }

    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development' && display === true) {
        console.warn('[Laravel-VeeValidate Warning] ' + message);
    }
}

/**
 * Display a fatal error
 *
 * @param message
 * @param display
 */
export function fatalError(message, display) {
    if (!message) {
        message = 'Unknown Error';
    }

    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development' && display === true) {
        console.error('[Laravel-VeeValidate Fatal Error] ' + message);
    }
}

/**
 * Validate our field map
 *
 * @param field_map
 * @returns {boolean}
 */
export function validFieldMap(field_map) {
    let keys = Object.keys(field_map);
    let dup_keys = [];

    if (keys.length <= 0) {
        return false;
    }

    for(let i = 0; i < keys.length; i++) {
        let value = field_map[keys[i]];

        if (!value) {
            return false;
        }

        if (dup_keys.includes(value)) {
            return false;
        }

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
export function responseHasErrors(data) {
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
export function errorProcessor(validator, errors, field_map) {
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

        errors[keys[i]].forEach(function (msg) {
            validator.errors.add({
                field: field,
                msg: msg
            });
        });
    }
}

/**
 * Get an option from our Options object
 *
 * @param option
 * @param options_bag
 * @param default_option
 * @returns {*}
 */
export function getOption(option, options_bag, default_option) {
    if (!option || !options_bag || !default_option) {
        return null;
    }

    if (options_bag[option] === undefined) {
        return default_option;
    }

    return options_bag[option];
}

/**
 * Return the same kind of object no matter what driver
 *
 * @param response
 * @param driver
 * @returns {Promise<any>}
 */
export function processResponseForDriver(response, driver) {
    return new Promise(function (resolve, reject) {
        if (!response || !driver) {
            reject('Response not properly provided.')
        }

        if (driver === 'axios') {
            resolve(response.response)
        } else if (driver === 'fetch') {
            response.json().then(function (json_data) {
                resolve({
                    status: response.status,
                    data: json_data ? json_data : null,
                });
            });
        } else {
            reject('Driver not found.');
        }
    });
}
