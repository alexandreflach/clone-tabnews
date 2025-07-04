export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Unexpected error happened.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Reach out to support.";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Service unavaliable at this moment.", {
      cause,
    });
    this.name = "ServiceError";
    (this.action = "Check if service is avaliable."), (this.statusCode = 503);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
export class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Validation error occured.", {
      cause,
    });
    this.name = "ValidationError";
    this.action = action || "Check the data sent and retry.";
    this.statusCode = 400;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
export class NotFoundError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Was not possible to find this resource in the system.", {
      cause,
    });
    this.name = "NotFoundError";
    this.action = action || "Check if paramteres sent are fine.";
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Method not allowed for this endpoint.");
    this.name = "MethodNotAllowedError";
    (this.action = "Check if method HTTP sent is valid for this endpoint."),
      (this.statusCode = 405);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
