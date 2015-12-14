# AWS Lambda Local

Test your API Gateway and Lambda integration in a local environment.

## Current Support

__API Gateway__
* Integration Request: Map path variables, query parameters and headers to pass to your Lambda function.

__Lambda Functions__
* Resource Endpoint: Lambda functions act as an endpoint reachable by a URI

## Getting Started

    $ npm install
    $ npm run example

This will start a server on port `8080`. Going to the url [http://localhost:8080/abc](http://localhost:8080/abc) will result in an internal server error - the example mapping relies on a post body.

### Postman

Open [Postman](https://www.getpostman.com/) or a tool of your choice to simulate http requests.

* Change the request type to `POST`
* Enter `http://localhost:8080/abc` in the URL
* Choose the __Body__ tab
  * Select __Raw__ 
  * Paste the following:
```json
{
    "things" : {
        "1" : {},
        "2" : {},
        "3" : {}
    }
}
```

Your setup should look like this:

![Postman Config](./postman.png)

Clicking on send should output the following:

```json
{
    "id": "abc",
    "count": "3",
    "things": {
        "1": {},
        "2": {},
        "3": {}
    }
}
```

## Options
