import * as v from "valibot";

export const ratingFieldSchema = v.object({
  name: v.string([v.minLength(1, "Name should not be empty.")]),
  categoryId: v.uuid("Invalid Category ID."),
});

export const ratingCategorySchema = v.pick(ratingFieldSchema, ["name"]);
