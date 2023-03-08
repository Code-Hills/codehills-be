/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import db from "./../database";
const { Project } = db;

export default class projectService {
  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */

  static async createProject(param) {
    try {
      const projects = await Project.create(param);
      return projects;
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
}
