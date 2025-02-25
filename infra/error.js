export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Unexpected error happened.", {
      cause,
    });
    this.name = "InternalServerError";
    (this.action = "Reach out to support."), (this.statusCode = 500);
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
