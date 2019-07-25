import config from '../config'
import URI from 'urijs'

import * as AuthActions from '../actions/auth'

const API_URL = config.api.url

const getURL = endpoint => {
  const url = endpoint.indexOf('://') !== -1
    ? endpoint
    : API_URL + endpoint

  return new URI(url)
}

const sendRequest = (endpoint, token, authenticated = false, options = {}) => {
  let url = getURL(endpoint)

  options = {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...options
  }

  if (authenticated) {
    if (token) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': 'Bearer ' + token
        }
      }
    } else {
      return Promise.reject(new Error('Unauthorized'))
    }
  }

  if (options.body && options.method === 'get') {
    url = url.query(options.body)

    delete options.body
  }

  if (options.body && options.method === 'post' && options.headers['Content-Type'] !== 'multipart/form-data') {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options.body)
    }
  }

  return fetch(url.toString(), options)
    .then(response => {
      return response.json().then(json => ({ json, response }))
    })
    .then(({ response, json }) => {
      if (!response.ok || json.error) {
        return Promise.reject({
            message: json.message,
            body: json
          })
      }

      return {
        body: json
      }
    })
}

const middleware = store => next => action => {
  const request = action.API

  if (!request) {
    return next(action)
  }

  const { token } = store.getState().user
  const { types, endpoint, authenticated, options } = request

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  const [ requestType, successType, failureType ] = types

  delete action.API

  const nextAction = {
    ...action,
    type: requestType
  }

  next(nextAction)

  return sendRequest(endpoint, token, authenticated, options)
    .then(
      response => {
        const result = {
          ...action,
          type: successType,
          request: request,
          response: response.body.data,
          authenticated: authenticated
        }

        if (config.logs.api) {
          console.log(result)
        }

        return next(result)
      },
      error => {
        const result = {
          ...action,
          type: failureType,
          request: request,
          error: (error && error.message) || 'Something bad happened'
        }

        if (config.logs.api) {
          console.log(result)
        }

        if (result.error === 'Unauthorized') {
          next(AuthActions.logout())
        }

        return next(result)
      }
    )
}

export default middleware
