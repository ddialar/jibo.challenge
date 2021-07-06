# JIBO CHALLENGE - BITACORA

## Types definition

### API types

#### `ServiceResponse` interface definition

I decied to define this data structure to be returned by the `test-service` API due to it's the best option for working with both third party APIs.

The main idea with this approah is to provide the client application an stable and simple data structure which it's easy to work and itterate.

Besides that, the selected data structure matches whith the `NluBRespose` one. The reason why this one has not been used in order to implement the `ServiceResponse` interface is to keep clearly differentiated the current service API response data structure from a third party one.

Obviously, if the third party API response structrure changes, we have to adapt just the `infrastructure` affected code but, our `test-service` response should not be modified.

Other subject apart could be whether our service needs to connect with other additional service. In that case, it'll be needed to analyze the data structure provided and check how it affects the whole service. 

## Infrastructure

### API section

#### REST API `runRequest` method

In this method has been defined the `url` field as optional string value.

In the currecnt version of the code, this field is never used. However, this method signature has been defined this way previewing future development where the `baseUrl` field content is not enough and the use of `url` one can provide additional support for a more flexible implementation of the method.
