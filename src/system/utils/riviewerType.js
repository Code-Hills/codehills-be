import UserService from "../../services/userService";

export async function reviewerType(revieweeId, reviewerId) {
  try {
    // const {reviewerId, revieweeId} = req.body;
    let type = "";
    const user = await UserService.findUserById(reviewerId);
    if (user.id === revieweeId) {
      type = "self review";
    } else {
      if (user.type != "manage") {
        type = "peer review";
      } else if (user.type === "manage") {
        type = "manager review";
      }
    }
    return type;
  } catch (error) {
    console.log("errorrr---", error);
    return false;
  }
}
