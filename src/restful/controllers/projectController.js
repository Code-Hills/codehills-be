// // Create a project
// const project = await Project.create({ name: "Project 1" });

// import UserService from "../../services/userService";

// // Get a user by their ID
// const user = await User.findByPk(1);

// // Add the user to the project
// await project.addUser(user);

import db from "../../database";
const { Project, User, UserProject } = db;

export default class projectController {
  static async createProject(req, res) {
    try {
      const { name, description, startDate, endDate } = req.body;
      const project = await Project.create({
        name,
        description,
        startDate,
        endDate,
      });
      return res.status(201).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async getAllProjects(req, res) {
    try {
      const projects = await Project.findAll();
      // console.log(projects);
      // const projects = await Project.findAll({
      //   include: [
      //     {
      //       model: User,
      //       as: "users",
      //       attributes: ["id", "firstName", "lastName", "email"],
      //       through: { attributes: [] },
      //     },
      //   ],
      // });
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async addUserToProject(req, res) {
    try {
      const { userId, projectId } = req.body;

      // Check if user and project exist
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Check if user is already assigned to project
      const userProject = await UserProject.findOne({
        where: { userId, projectId },
      });
      if (userProject) {
        return res
          .status(400)
          .json({ error: "User is already assigned to this project" });
      }

      // Create UserProjects record
      await UserProject.create({ userId, projectId });

      return res.status(200).json({ message: "User added to project" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  static async removeUserFromProject(req, res) {
    try {
      const { userId, projectId } = req.body;

      // Check if user and project exist
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Check if user is assigned to project
      const userProject = await UserProject.findOne({
        where: { userId, projectId },
      });
      if (!userProject) {
        return res
          .status(400)
          .json({ error: "User is not assigned to this project" });
      }

      // Delete UserProjects record
      await UserProject.destroy({ where: { userId, projectId } });

      return res.status(200).json({ message: "User removed from project" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // static async getProjectUsers(req, res) {
  //   try {
  //     const { projectId } = req.params;

  //     // Check if project exist
  //     const project = await Project.findByPk(projectId);
  //     if (!project) {
  //       return res.status(404).json({ error: "Project not found" });
  //     }

  //     // Get all users assigned to project
  //     const users = await User.findAll({
  //       include: [
  //         {
  //           model: Project,
  //           as: "projects",
  //           where: { projectId: projectId },
  //           attributes: [],
  //         },
  //       ],
  //     });

  //     return res.status(200).json({ users });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Server error" });
  //   }
  // }

  static async getProjectUsers(req, res) {
    try {
      const { projectId } = req.params;
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      const users = await UserProject.findAll({
        where: {
          projectId,
        },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "email", "role"],
          },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  // static async getProjectManagers(req, res) {
  //   try {
  //     const { projectId } = req.params;

  //     // Check if project exist
  //     const project = await Project.findByPk(projectId);
  //     if (!project) {
  //       return res.status(404).json({ error: "Project not found" });
  //     }

  //     // Get all users assigned to project
  //     const users = await User.findAll({
  //       include: [
  //         {
  //           model: Project,
  //           as: "projects",
  //           where: { id: projectId },
  //           attributes: [],
  //         },
  //       ],
  //       where: { role: "manager" },
  //     });

  //     return res.status(200).json({ users });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Server error" });
  //   }
  // }

  // static async getProjectDevelopers(req, res) {
  //   try {
  //     const { projectId } = req.params;

  //     // Check if project exist
  //     const project = await Project.findByPk(projectId);
  //     if (!project) {
  //       return res.status(404).json({ error: "Project not found" });
  //     }

  //     // Get all users assigned to project
  //     const users = await User.findAll({
  //       include: [
  //         {
  //           model: Project,
  //           as: "projects",
  //           where: { id: projectId },
  //           attributes: [],
  //         },
  //       ],
  //       where: { role: "developer" },
  //     });

  //     return res.status(200).json({ users });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Server error" });
  //   }
  // }
}
