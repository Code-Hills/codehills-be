import { knownEvents, subscribe } from "./event.util";
import sendEmail from "../../services/emailService";
import NotificationService from "../../services/notificationService";

const { createNotification } = NotificationService;

export const listenToUserProjectAssigned = subscribe(
  knownEvents.addUserToProject,
  async (data) => {
    const { user, project } = data;
    const { email, firstName } = user.dataValues;
    const { name, id: projectId } = project.dataValues;

    const userNotification = {
      title: "Added to the project!",
      description: `You have been added to the ${name} project`,
      url: `${process.env.FRONTEND_URL}/projects/${projectId}`,
      userId: user.id,
    };

    await createNotification(userNotification);

    sendEmail(
      email,
      "Added to the project",
      `Hello ${firstName}, You have been added to the "${name}" project`,
      `${process.env.FRONTEND_URL}/projects/${projectId}`
    );
  }
);

export const listenToLeadProjectAssigned = subscribe(
  knownEvents.addLeadToProject,
  async (data) => {
    const { leadUser, project } = data;
    const { email, displayName, id: leadUserId } = leadUser.dataValues;
    const { name: projectName, id: projectId } = project.dataValues;

    const leadNotification = {
      title: "Added to the project as lead!",
      description: `You have been added to the project "${projectName}" as the project lead`,
      url: `${process.env.FRONTEND_URL}/projects/${projectId}`,
      userId: leadUserId,
    };
    await createNotification(leadNotification);
    sendEmail(
      email,
      "Added to the project as lead!",
      `Hello ${displayName}, You have been added to the project "${projectName}" as the project lead.`,
      `${process.env.FRONTEND_URL}/projects/${projectId}`
    );
  }
);
