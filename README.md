# 🚨 Laravel VeeValidate
##### The super simple JS package that will handle your Laravel errors and automatically inject them into a VeeValidate instance ✨

![Example Image](https://res.cloudinary.com/sammyjo20/image/upload/v1551134147/laravel-veevalidate/Example.png)

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

### Using it from with Axios
To use the error handler with Axios, you will need to place the handleError method inside of the catch() block of the Axios promise. 

The first parameter you must provide is the VeeValidate instance you would like to use. It's recommended to use the global directive ($validator). The second parameter is the response callback which Axios provides. You may also provide a third a fouth parameter, third for custom field mapping and fourth for options. See "Custom field mapping" and "Options" for more information.
```javascript
axios(...)
    .catch(error_response => {
       LaravelValidator.handleError(this.$validator, error_response) 
    })
```

### Using it with Fetch
To use the error handler with Fetch, you will need to place the handleFetchError method inside of the then() block of the Fetch promise. **(You may use the handleError method but you will need to set the driver option to 'fetch').**

The first parameter you must provide is the VeeValidate instance you would like to use. It's recommended to use the global directive ($validator). The second parameter is the response callback which Fetch provides. You may also provide a third a fouth parameter, third for custom field mapping and fourth for options. See "Custom field mapping" and "Options" for more information.

```javascript
fetch(...)
    .then(response => {
       LaravelValidator.handleFetchError(this.$validator, response) 
    })
```

### Custom field mapping
Sometimes your Request/Eloquent attributes won't match your VeeValidate fields/names. You can really easily "map" this by passing a key value object as a third parameter.

```javascript
    // Axios
    LaravelValidator.handleError(this.$validator, error_response, {
           'email_address': 'email address', // Attribute => Field Name
       }) 
    })
    
    // Fetch
    LaravelValidator.handleFetchError(this.$validator, response, {
           'email_address': 'email address', // Attribute => Field Name
       }) 
    })
```
