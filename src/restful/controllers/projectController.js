import db from "../../database";
import projectService from "../../services/projectService";
import UserService from "../../services/userService";
const { UserProject } = db;

const { createProject, findAllProjects, findProjectById, findUserProject } =
  projectService;

const { findOneUser } = UserService;

export default class projectController {
  static async createProject(req, res) {
    try {
      const user = req.user;
      if (user && user.role === "admin") {
        const { name, description, startDate, endDate } = req.body;
        const currentDate = new Date();
        if (new Date(startDate) < currentDate) {
          return res
            .status(400)
            .json({ message: "Start date cannot be in the past" });
        }
        if (new Date(startDate) > new Date(endDate)) {
          return res
            .status(400)
            .json({ error: "End date must be after the start date!" });
        }
        const newProject = { name, description, startDate, endDate };
        const project = await createProject(newProject);
        return res
          .status(201)
          .json({ message: "Project created successfully!", project: project });
      }
      return res
        .status(401)
        .json({ message: "Not Authorized! Only admin can create projects" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async getAllProjects(req, res) {
    try {
      const user = req.user;
      if (user && user.role === "admin") {
        const projects = await findAllProjects();
        return res.status(200).json({
          message: "All projects retrieved successfully!",
          projects: projects,
        });
      }
      return res
        .status(401)
        .json({ message: "Not Authorized! Only admin can view all projects" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async addUserToProject(req, res) {
    try {
      const user = req.user;
      if (user && user.role === "admin") {
        const projectId = req.params.projectId;
        const email = req.body.email;

        const user = await findOneUser({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const project = await findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

        const userId = user.id;
        const userProject = await findUserProject({
          userId,
          projectId,
        });
        if (userProject) {
          return res
            .status(400)
            .json({ error: "User is already assigned to this project" });
        }

        await project.addUsers(user);

        return res.status(200).json({ message: "User added to project" });
      }
      return res.status(401).json({
        message: "Not Authorized! Only admin can add users to projects",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async removeUserFromProject(req, res) {
    try {
      const user = req.user;
      if (user && user.role === "admin") {
        const { projectId } = req.params;

        const email = req.body.email;

        const user = await findOneUser({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const project = await findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

        const userId = user.id;
        const userProject = await UserProject.findOne({
          where: { userId, projectId },
        });
        if (!userProject) {
          return res
            .status(400)
            .json({ error: "User is not assigned to this project" });
        }

        await project.removeUsers(user);

        return res
          .status(200)
          .json({ message: "Successfully removed the user from project" });
      }
      return res.status(401).json({
        message: "Not Authorized! Only admin can add users to projects",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async getProjectUsers(req, res) {
    try {
      const { projectId } = req.params;
      const project = await findProjectById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const users = await project.getUsers({
        attributes: ["id", "firstName", "lastName", "email", "role"],
        through: {
          attributes: [],
        },
        joinTableAttributes: [],
      });
      res.status(200).json({
        message: `Retrieved All users assigned to ${project.name} project`,
        users: users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async deleteProject(req, res) {
    try {
      const user = req.user;
      if (user && user.role === "admin") {
        const { projectId } = req.params;
        const project = await findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        await project.destroy();
        return res
          .status(200)
          .json({ message: "Project deleted successfully" });
      }
      return res
        .status(401)
        .json({ message: "Not Authorized! Only admin can delete projects" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async updateProject(req, res) {
    try {
      const user = req.user;
      if (user && user.role === "admin") {
        const { projectId } = req.params;
        const project = await findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        const { name, description, startDate, endDate } = req.body;
        if (new Date(startDate) > new Date(endDate)) {
          return res
            .status(400)
            .json({ error: "End date must be after the start date!" });
        }
        const updatedProject = { name, description, startDate, endDate };
        await project.update(updatedProject);
        return res
          .status(200)
          .json({ message: "Project updated successfully", updatedProject });
      }
      return res
        .status(401)
        .json({ message: "Not Authorized! Only admin can update projects" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async getProject(req, res) {
    try {
      const { projectId } = req.params;
      const project = await findProjectById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res
        .status(200)
        .json({ message: "Project retrieved successfully", project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async updateProjectLead(req, res) {
    const user = req.user;
    try {
      if (user && user.role === "admin") {
        const { projectId } = req.params;

        const email = req.body.email;
        const user = await findOneUser({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const project = await findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

        if (user.role !== "architect") {
          return res.status(400).json({
            error: "Only an architect can be assigned as a project lead",
          });
        }

        if (project.projectLeadId === user.id) {
          return res.status(400).json({
            message: "This architect is already assigned to this project!",
          });
        }

        await project.update({ projectLeadId: user.id });

        return res
          .status(200)
          .json({ message: "Added a project lead successfully!" });
      }
      return res.status(401).json({
        message: "Not Authorized! Only admin can update a project lead",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}
