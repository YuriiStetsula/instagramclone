const REQUEST_RESET = 'REQUEST_RESET'

function resetRequest (name) {
  return {
    type: REQUEST_RESET,
    name: name
  }
}

export {
  REQUEST_RESET,
  resetRequest
}
