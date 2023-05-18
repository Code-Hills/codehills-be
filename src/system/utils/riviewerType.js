import UserService from "../../services/userService";
import projectService from "../../services/projectService";

export async function reviewerType(revieweeId, reviewerId) {
  try {
    const user = await UserService.findUserById(reviewerId);
    if (user.id === revieweeId) {
      return "self review";
    } else {
      const project = await projectService.findProject({
        projectLeadId: reviewerId,
      });
      if (project) {
        return "manager review";
      }
      return "peer review";
    }
  } catch (error) {
    return false;
  }
}
