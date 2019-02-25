# 🚨 Laravel VeeValidate
##### The super simple JS package to parse your Laravel Validation errors into VeeValidate.

## Installation
```
yarn add laravel-veevalidate
```
or
```
npm -i laravel-veevalidate
```

## Usage
Assuming you already have VeeValidate installed, you can use Laravel VeeValidate on a component-to-component basis.

```javascript
import LaravelValidator from 'laravel-veevalidate';
```

### Using it from within the Axios catch() method.
The first parameter you must provide is the VeeValidate instance you would like to use. It's recommended to use the global directive ($validator). The second parameter is the response callback which Axios provides.
```javascript
    axios(...)
        .catch(error_response => {
           LaravelValidator.handleError(this.$validator, error_response) 
        })
```

### Custom field mapping
Sometimes your Request/Eloquent attributes won't match your VeeValidate fields/names. You can really easily "map" this by passing a key value object as a third parameter.

```javascript
    axios(...)
        .catch(error_response => {
           LaravelValidator.handleError(this.$validator, error_response,{
               'email_address': 'email address',
           }) 
        })
```