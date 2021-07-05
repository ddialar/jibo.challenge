# JIBO CHALLENGE - BITACORA

## Types definition

### API types

#### `ApiResponse` interface definition

I decied to define this data structure to be returned by the `test-service` API due to it's the best option for working with both third party APIs.

The main idea with this approah is to provide the client application an stable and simple data structure which it's easy to work and itterate.

Besides that, the selected data structure matches whith the `NluBRespose` one. The reason why this one has not been used in order to implement the `ApiResponse` interface is to keep clearly differentiated the current service API response data structure from a third party one.

Obviously, if the third party API response structrure changes, we have to adapt just the `infrastructure` affected code but, our `test-service` response should not be modified.

Other subject apart could be whether our service needs to connect with other additional service. In that case, it'll be needed to analyze the data structure provided and check how it affects the whole service. 

## Infrastructure

### API section

#### REST API `runRequest` method

In this method has been defined the `url` field as optional string value.

In the currecnt version of the code, this field is never used. However, this method signature has been defined this way previewing future development where the `baseUrl` field content is not enough and the use of `url` one can provide additional support for a more flexible implementation of the method.

### Server section

#### `NluRequest` interface with optional field

I decided to set the `nlu` field into this interface as optional due to define it as required, will generate a typing error in the middlewares where this interface is used.

It's due to meanwhile it's true that once the business logic defined into the middleware is excecuted successfully and as result of that process, the `res` field provided to the next step in the routing already contains a well initialized `nlu` field, in the previous step before running the middleware, `nlu` doesn't exist but, setting this field as required, we are telling to TypeScript that it must be already defined. So this is the reason of the error and why it must be defined as optional.

In order to ensure the `nlu` is correctly set and no empty object or undefined value is passed to the next step, the middleware business logic include a validation process which ensures the provided payload is valid and can be processed into the application.