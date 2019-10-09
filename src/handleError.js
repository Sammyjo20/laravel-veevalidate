import {
    validStatus,
    warning,
    fatalError,
    validFieldMap,
    responseHasErrors,
    errorProcessor,
    getOption,
    processResponseForDriver
} from './core.js';

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
function handleError(validator, response, field_map, options) {
    if (!field_map) {
        field_map = {};
    }

    if (!options) {
        options = {};
    }

    let driver = getOption('driver', options, 'axios');
    let show_errors = getOption('show_errors', options, true);

    processResponseForDriver(response, driver).then(function (response) {

        if (!validator) {
            return fatalError('VeeValidate instance not found.', show_errors);
        }

        if (!response) {
            return fatalError('Response empty. Are you using the right driver?', show_errors);
        }

        if (Object.keys(field_map).length > 0 && !validFieldMap(field_map)) {
            return fatalError('Your field map was not valid.', show_errors);
        }

        if (!validStatus(response.status)) {
            if (response.status === 403) {
                warning('Response was not authorized.', show_errors);
            }

            warning('Response status did not meet expectations. Expecting: 422', show_errors);
        }

        if (!responseHasErrors(response.data)) {
            return warning('Response did not contain any Laravel errors.', show_errors);
        }

        errorProcessor(validator, response.data.errors, field_map);

        // Boom.
    }).catch(function (error) {
        return fatalError(error, show_errors)
    });
}

module.exports = handleError;
