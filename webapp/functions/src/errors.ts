import { ZodIssue } from "zod";

export class ZodValidationError extends Error {
  constructor(message: string, public readonly errors: ZodIssue[]) {
    super(`${message}: ${errors.map((e) => e.message).join(", ")}`);
    this.name = "ValidationError";
    this.errors = errors;
  }
}