import db from "../../database";
import projectService from "../../services/projectService";
import UserService from "../../services/userService";
const { UserProject } = db;

export default class projectController {
  static async createProject(req, res) {
    try {
      const user = req.user;
      if (user && user.role === "admin") {
        const { name, description, startDate, endDate } = req.body;
        const newProject = { name, description, startDate, endDate };
        const project = await projectService.createProject(newProject);
        return res.status(201).json(project);
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
        const projects = await projectService.findAllProjects();
        return res.status(200).json(projects);
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
        const userId = req.body.userId;

        const user = await UserService.findUserById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const project = await projectService.findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

        const userProject = await projectService.findUserProject({
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
        const { userId, projectId } = req.params;

        const user = await UserService.findUserById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const project = await projectService.findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

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
      const project = await projectService.findProjectById(projectId);
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
        const project = await projectService.findProjectById(projectId);
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
        const project = await projectService.findProjectById(projectId);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        const { name, description, startDate, endDate } = req.body;
        const updatedProject = { name, description, startDate, endDate };
        await project.update(updatedProject);
        return res
          .status(200)
          .json({ message: "Project updated successfully" });
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
      const project = await projectService.findProjectById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(200).json({ project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}
