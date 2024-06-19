import * as v from "valibot";

export const paginationSchema = v.object({
  limit: v.optional(
    v.string([v.minValue(1, "Limit should be greater than 0.")])
  ),
  page: v.optional(v.string([v.minValue(1, "Page should be greater than 0.")])),
});
