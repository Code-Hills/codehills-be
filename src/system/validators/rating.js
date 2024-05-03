import * as v from "valibot";

export const ratingCategorySchema = v.object({
  name: v.string([v.minLength(1, "Name should not be empty.")]),
});
