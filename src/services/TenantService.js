import { Op } from "sequelize";
import db from "../database";
const { Tenants } = db;

export default class TenantService {
    static async findAllTenants(param) {
        return await Tenants.findAll()
    }

    static async findOneTenant(param) {
        return await Tenants.findOne({
            where: param
        })
    }
}
