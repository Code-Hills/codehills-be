import * as v from "valibot";

export const ratingFieldSchema = v.object({
  name: v.string([v.minLength(1, "Name should not be empty.")]),
  categoryId: v.uuid("Invalid Category ID."),
});

export const ratingCategorySchema = v.pick(ratingFieldSchema, ["name"]);

export const overallReviewSchema = v.object({
  comment: v.string([v.minLength(1, "Comment should not be empty.")]),
  revieweeId: v.uuid("Invalid Reviewee ID."),
  reviewCycleId: v.uuid("Invalid Review Cycle ID."),
  fieldReviews: v.array(
    v.object({
      ratingFieldId: v.uuid("Invalid Rating Field ID."),
      ratings: v.number([
        v.minValue(1, "Rating should be greater than or equal to 1."),
        v.maxValue(5, "Rating should be less than or equal to 5."),
      ]),
    }),
    "Field reviews should be an array of objects."
  ),
});
