# SoundCloudQL [![Build Status](https://travis-ci.org/garriguv/soundcloudql.svg?branch=master)](https://travis-ci.org/garriguv/soundcloudql)

GraphQL wrapper around the soundcloud api.

### Getting started

Install the dependencies

    npm install

Get a [SoundCloud api client id](http://soundcloud.com/you/apps), and set it in `.env`

    cp .env.sample .env
    vi .env

Run it (with [node-foreman](https://github.com/strongloop/node-foreman))

    nf start

You'll find GraphiQL at [http://localhost:5000/graphql](http://localhost:5000/graphql)

### Testing

The tests are run with a cache containing a record of api responses. When adding new tests, the api may be called if there are any new calls. The responses are automatically cached in this case.

    npm test

You can skip the lint step by running

    npm run testonly
