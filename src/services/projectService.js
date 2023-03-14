/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import db from "./../database";
const { Project, UserProject } = db;

export default class projectService {
  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */

  static async createProject(param) {
    try {
      const project = await Project.create(param);
      return project;
    } catch (error) {
      throw error;
    }
  }

  static async findProject(param) {
    try {
      const projects = await Project.findOne({
        where: param,
      });
      return projects;
    } catch (error) {
      throw error;
    }
  }

  static async findAllProjects() {
    try {
      const projects = await Project.findAll();
      return projects;
    } catch (error) {
      throw error;
    }
  }

  static async findProjectById(id) {
    try {
      const project = await Project.findByPk(id);
      return project;
    } catch (error) {
      throw error;
    }
  }

  static async findUserProject(param) {
    try {
      const userProject = await UserProject.findOne({
        where: param,
      });
      return userProject;
    } catch (error) {
      throw error;
    }
  }

  static async getProjectLead(id) {
    try {
      const project = await Project.findByPk(id);
      const project_lead = project?.project_lead;
      return project_lead;
    } catch (error) {
      throw error;
    }
  }
}
