![Header banner](https://github.com/ddialar/jibo.challenge/blob/master/docs/img/headerBanner.png)

# Jibo code challenge

<img src="https://img.shields.io/badge/Version-1.0.0-yellow" /> <img src="https://img.shields.io/badge/TypeScript-4.3.5-blue" /> <img src="https://img.shields.io/badge/Webpack-5.42.1-blue" /> <img src="https://img.shields.io/badge/Jest-27.0.6-green" /> <img src="https://img.shields.io/badge/openApi-4.1.6-green" /> <img src="https://img.shields.io/badge/Docker-20.10.2-blue" /> <img src="https://img.shields.io/badge/test-passed-brightgreen" /> <img src="https://img.shields.io/badge/test%20coverage-90%2C93%25-brightgreen" />

## 📖 Index

-   [Challenge](https://github.com/ddialar/jibo.challenge#challenge)
-   [Questions](https://github.com/ddialar/jibo.challenge#questions)
-   [Description](https://github.com/ddialar/jibo.challenge#description)
-   [System requirements](https://github.com/ddialar/jibo.challenge#requirements)
-   [Repository overview](https://github.com/ddialar/jibo.challenge#repository-overview)
    -   [Environment variables](https://github.com/ddialar/jibo.challenge#repository-overview-environment-variables)
    -   [Architecture](https://github.com/ddialar/jibo.challenge#repository-overview-architecture)
        -   [common](https://github.com/ddialar/jibo.challenge#repository-overview-architecture-common)
        -   [domain](https://github.com/ddialar/jibo.challenge#repository-overview-architecture-domain)
        -   [infrastructure](https://github.com/ddialar/jibo.challenge#repository-overview-architecture-infrastructure)
        -   [test](https://github.com/ddialar/jibo.challenge#repository-overview-architecture-test)
        -   [types](https://github.com/ddialar/jibo.challenge#repository-overview-architecture-types)
    -   [Execution environments](https://github.com/ddialar/jibo.challenge#repository-overview-environments)
-   [Commands guide](https://github.com/ddialar/jibo.challenge#commands)
    -   [Switch Node version](https://github.com/ddialar/jibo.challenge#commands-switch-node)
    -   [Modules installation process](https://github.com/ddialar/jibo.challenge#commands-installation)
    -   [Run tests](https://github.com/ddialar/jibo.challenge#commands-tests)
    -   [Run application in development mode](https://github.com/ddialar/jibo.challenge#commands-dev-mode)
    -   [Build the application](https://github.com/ddialar/jibo.challenge#commands-build)
-   [API REST documentation](https://github.com/ddialar/jibo.challenge#apidoc)
-   [Bitacora of the repository](https://github.com/ddialar/jibo.challenge#bitacora)
-   [Technical debt](https://github.com/ddialar/jibo.challenge#tech-debt)

## <a id="challenge"></a>🏆 Challenge

We want to create a microservice, let’s call it `test-service` from now on, that is going to interact with other services as is shown in the
following diagram:

![Challenge diagram](https://github.com/ddialar/jibo.challenge/blob/master/docs/img/challengeDiagram.jpg)

Where:
- `NLU_A` is a 3rd party service that has its own REST API,
- `NLU_B` is a 3rd party service that has its own REST API,
- and `test-service` is the service you are asked to develop, having its own REST API.

### Requirements

The purpose of the `test-service` is to call both NLU endpoints (A and B) to compare and return the best result to the client. It is mportant that the client gets the best result as soon as possible.

You can also assume the following:
- The NLU_A average response time is 300ms.
- The NLU_B average response time is 250ms.

ℹ️ The best result is defined as the response with the highest confidence (more details on the contacts below).

To develop the test-service you have the following requirements:
- Use of TypeScript.
- You can use any web application framework but Express is preferred.
- Demonstrate how you would handle any errors. No need to be exhaustive.
- Define and implement the “contracts” of the `test-service` using an “openapi” spec.
- Demonstrate your TDD experience by creating the proper tests (and mocks).

In order to evaluate the service we should only have to run:

```sh
yarn
yarn build
yarn test
# Or npm instead of yarn, if you prefer.
```

where all the tests you created should pass.

### Contracts

The contracts of each API are listed here:

**NLU_A API**
- Request
  ```
  NluARequest {
    text: string,
    model: string
  }
  ```
- Response
  ```
  NluAResponse {
    intents: string[],
    entities: string[],
    confidence: number
  }
  ```

**NLU_B API**
- Request
  ```
  NluBRequest {
    utterance: string,
    model: NluBModels
  }
  ```

  where NLUBModels is an enum:

  ```
  enum NluBModels {
    modelA = "modelA",
    modelB = "modelB",
    modelC = "modelC",
  }
  ```

- Response
  
  ```
  nluBResponse = NluBResponse[];
  ```

  where NluBResponse is defined as:

  ```
  NluBResponse {
    intent: string,
    entity: string,
    confidence: number
  }
  ```

## <a id="questions"></a>🧐 Questions

1. If we add another NLU service, let’s say NLU_C, that has an average response time of 50ms, how this would affect the design of the `test-service`?

    If we just limit our analysis to the simple fact of reponse time, the `test-service` won't be affected any way.
    
    The reason of this sentence is because in order to make a valid comparison with the information provided by the multiple data sources, we have to wait for the slowest one, so it doesn't matter if we include faster services.

    However, a possible solution in order to improve the response speed could be to cache the requests and their results. This way, every time the service receives the same request, we can return the already persisted result.

    Nevertheless, this last option comes with a cons. If the data sources change, our service must be notified and the whole cached requests updated.

    At this point, we have to analyze the cost/profit balance and take a final decision. 

2. test-service API
    - Request

      [ GET ] `<url/to/service>/nlu/:text/:utterance/:model`

      A strict route definition based on request params was selected over other possible solutions because it's the most robust, well formed and type guarded option.

      It's the most robust option because due to the whole parameters are required in order to performance a valid request, we are defining a well know data structure and, in case the URL doesn't include some of the params, it will result in an error from the service, due to the provided resource doesn't match with defined ones.

      It's the most well formed option because we are able to know what element we are providing to the URL and what is it place on it.

      It's the most type guarded option because this strategy of passing information always provide data as `string` to the endpoint business logic, so based on that, we can work applying validators and/or parsers.

      Another possible option could be use a plain URL and define our request via query params. It's a well known and really extended option but, due to the optional nature of the provided parameters, it will require to implement additional checking business logic in the service. In addition, due to the URL is so generic, it could be misunderstood with other opperation (for instance, providing a set of query params to run an specific action and with another set, run a completly differente one). This point increases the complexity of the code in charge of handling the resquests to this path.

      Finally, the most comfortable option from the point of view of passing information to the service, would be to directly send a JSON object as `body` payload in the request. However, despite of it's supported by REST in `GET` type requests, it's not usual to run these kind of requests this way and not all libraries have implemented the needed logic in order to handle this strategy. That is the main reason in order to discarg this option to implement the service API.

    - Response

      When the request is run successfully, the response of this service will have the next structure:

      ```
      {
        intents: string[]
        entities: string[]
        confidence: number
      }
      ```

      If both third party services return valid results, the `test-service` will return the processed result.

      In the other hand, if the services fails or they don't return any result, the default value returned by the `test-service` will be next:

      ```
      {
        intents: []
        entities: []
        confidence: 0
      }
      ```

      Finally, in case the requested URL is malformed, the service will return a not-found error (404).

## <a id="description"></a>🔍 Description

This repository is aimed to implement the solution needed in order to resolve the described challenge.

Most part of this code is created following the **functional programming** paradigm meanwhile OOP has been used only to create the error objects whose will be triggered when an exception appears.

The code is organized following the `domain/infrastructure` architechture, reinforced by some additional and auxiliary layers.

Some tools used on this repository are next:

-   📦 `Webpack` for transpiling and bundling the TypeScript code.
-   ⚙️ `dotenv` for environment variables.
-   📝 `Swagger` for API REST documentation.
-   💾 `Log4JS` for logging tasks.
-   🧪 `Jest` for unit testing, as well as `supertest` for API enpoints integration tests.
-   🔍 `ESLint` for code linting and formating.
-   🐶 `Husky` for managing the Git Hooks.

Therefore this repository is defined to work with `NodeJS 16.4.1`.

If you are running differente versions of NodeJS in your system, just run `nvm use` and it will be switched to the version defined in the `.nvmrc` file.

## <a id="requirements"></a>💻 System requirements

To run this code in your system, it must satisfy the next minimum requirements:

-   NodeJS 16.4.1
-   npm 7.12.1
-   npx 7.12.1

In addition, it's advisable to have next:

-   nvm 0.33.0
-   Web browser (recomended Google Chrome 88.0)
-   Code editor (recomended VScode 1.57.1)

## <a id="repository-overview"></a>👀 Repository overview

### <a id="repository-overview-environment-variables"></a>⚙️ Environment variables

Due to we have selected `dotenv` as environmet variables handler, in the root of the project will be a folder named [`env`](https://github.com/ddialar/jibo.challenge/blob/master/env).

In this folder you have to define a minimum of two differente environment files:

-   `.env.dev` for development.
-   `.env.test` for testing.

The different scripts created for running the application in every environment are prepared to load the configuration and applying it to the code.

The most basic fields we must include on these files are next:

```sh
NODE_ENV="production" | "development" | "test"

# Set the port number that best matches for your environment.
SERVER_PORT=4000

# Set the logging level that best matches for your environment.
LOGGER_LEVEL="off" | "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "all"

# URL for third party services.
NLU_A_PATH="url/to/nlu_a_service/"
NLU_B_PATH="url/to/nlu_b_service/"

# Rest of the environment variables here.
```

### <a id="repository-overview-architecture"></a>🏗 Architecture

This repository is implemented following the most basic Layered Architecture, it means, **domain** and **infrastructure**.

The full folders structure is next:

```
📂 src/
    📂 common/
    |   📂 errors/
    |   📂 logger/
    📂 domain/
    |   📂 services/
    📂 infrastructure/
    |   📂 repository/
    |   |   📂 rest/
    |   📂 dataSources/
    |   📂 mappers/
    |   📂 server/
    |       📂 apidoc/
    |       📂 middlewares/
    |       📂 routes/
    📂 test/
    |   📂 fixtures/
    📂 types/
```

#### <a id="repository-overview-architecture-common"></a>🔄 common

On this layer we implement the set of elements that are horizontaly common to the whole application.

The folders used in this section and their targets are next:

-   `errors`

    This folder contains the error handling configuration for the whole application.

    In this part is where there is implemented the only OOP part of the code.

    The errors are sorted by functionality. This way, we can find the specific folders in order to group: authentication, posts, users and common errors.

-   `logger`

    Here is configured the logging tool used in the application.

#### <a id="repository-overview-architecture-domain"></a>🎯 domain

This layer is also known as `entities` or `core` in different architecture approaches.

This layer goal is to implement specific business logic strongly bound with the application use.

That business logic is defined into services grouped by functionality, into the `services` folder.

A quick rule to know whether a pice of code belongs to the `domain` layer is to ask ourself _"my application is the same if I extract this code from the domain?"_ If the answer is **NO**, then this code must be placed into the `domain` layer.

#### <a id="repository-overview-architecture-infrastructure"></a>🧩 infrastructure

On this layer we implement the needed tools strongly coupled for any kind of technology.

The strategy to follow for this layer is to keep in mind that if during the development process or for future refactors, some element in this layer must be replaced by another one that provides the same or better results, our application can not be affected and even whether it happens, the side effects in our application are really shallow.

To reach that goal, the code included into this layer is divided like that:

-   `repositories`

    This folder containts the needed code in order to implement the direct connection with third party data origins. In this case, to communicate with NLU_A and NLU_B third party services.

    The current business logic implemented in this section contains a subfolder named `rest`. The reason of making this differentiation is to preview future service evolution and the posibility of implement other communication strategies such as GraphQL or gRPC.

-   `dataSources`

    This section contains the whole elements focused on provide a successful application data persistance and retrieving.

    The target of the code included into this folder is to isolate the domain code from the different data access tools/resources that we could have implemented in our application.

    Once exposed the context of this folder content, it will be invoked only by domain services.

    In the same way, this code will only invoke functions defined into the differente data access tools/resources.

-   `mappers`

    When it's needed to move data from the data sources to the application and viceversa, the data structure must be parsed.

    These operations are performed via specific functions whose implement the `mapper` pattern.

-   `server`

    This folder contains the complete ExpressJS configuration, including middlewares definitions and API documentation.

#### <a id="repository-overview-architecture-test"></a>🧪 test

The testing strategy selected in this repository, for both cases for unit and integration tests, is to keep them as close as possible to the code that they are checking.

By this reason, you will find several `test` folders into the different sections of this code.

Webpack is already configured to ignore these files when the code is compiled for production environment.

Once said that, the content of this folder is a set of common tools user along the whole code and the main part are the fixtures used in order to emulate the real running conditions.

#### <a id="repository-overview-architecture-types"></a>🆎 types

This folder is specifically bound to the use of TypeScript on this project.

It contains different custom types and interfaces implementations used in differente layers, in order to provide the needed data structure definitions.

### <a id="repository-overview-environments"></a>🛠 Execution environments

Meanwhile we create a new application, we usually need a minimum of two environment: `testing` and `development`.

Both environment require specific configurations as well as database presets.

The first requirement is covered by the specific `.env` files that we configure for every case.

The second one is satisfied in this case by the configuration of different Docker containers that are executed in parallel with the code. It means that the system scrips (defined into the `package.json` file), are created in order to execute the `testing` or `development` database container, depending on the environment we are running.

Both environments are configured in order to be run independently so we can have both up at the same time.

## <a id="commands"></a>🔥 Commands guide

### <a id="commands-switch-node"></a>✅ Switch Node version

```sh
nvm use
```

### <a id="commands-installation"></a>⬇️ Modules installation process

```sh
npm i
```

### <a id="commands-tests"></a>🧪 Run tests

**Required files:**

-   `env/.env.test`

```sh
# Unit and integration tests.
npm test
# Watch mode.
npm run test:watch
# Coverage.
npm run test:coverage
```

### <a id="commands-dev-mode"></a>🏭 Run application in development mode

**Required files:**

-   `env/.env.dev`

```sh
npm run build:dev
```

### <a id="commands-build"></a>🚀 Build the application

**Required files:**

-   `env/.env`

```sh
npm run build
```

## <a id="apidoc"></a>📗 API REST documentation

`http://localhost:3600/__/apidoc`

The access port must be defined in the environment variables. Take a look to the [**environment variables**](https://github.com/ddialar/jibo.challenge#repository-overview-environment-variables) section.

## <a id="bitacora"></a>🧭 Bitacora of the repository
Please, check the [BITACORA](https://github.com/ddialar/jibo.challenge/blob/master/BITACORA.md) file in this repository in order to get additional information about several decisions taken during the development process.

## <a id="tech-debt"></a>🤔 Technical debt

Please, check the [TECH-DEBT](https://github.com/ddialar/jibo.challenge/blob/master/TECH-DEBT.md) file in this repository in order to keep up-to-date about this subject.
