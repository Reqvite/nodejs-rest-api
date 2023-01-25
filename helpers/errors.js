class RestApiError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizideError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class WrongParametersError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class RegistrationConflictError extends RestApiError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  RestApiError,
  WrongParametersError,
  ValidationError,
  NotAuthorizideError,
  RegistrationConflictError,
};
