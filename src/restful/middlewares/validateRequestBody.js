import * as v from "valibot";
import Response from "../../system/helpers/Response";
import { filterValidationError } from "../../system/utils";

export function validateRequestBody(validationSchema) {
  return (req, res, next) => {
    const results = v.safeParse(validationSchema, req.body);
    if (!results.success) {
      return Response.error(res, 400, {
        message: "Please correct your inputs",
        errors: filterValidationError(results.issues),
      });
    }
    if (
      results.output.fieldReviews &&
      results.output.fieldReviews.length === 0
    ) {
      return Response.error(res, 400, {
        message: "Please provide at least one field review",
      });
    }
    req.body = results.output;
    return next();
  };
}

export function validateQueryParams(validationSchema) {
  return (req, res, next) => {
    const results = v.safeParse(validationSchema, req.query);
    if (!results.success) {
      return Response.error(res, 400, {
        message: "Please correct your inputs",
        errors: filterValidationError(results.issues),
      });
    }
    req.query = results.output;
    return next();
  };
}
