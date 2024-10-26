import DB from "../../database"
import Response from "../../system/helpers/Response"
import createSubdomain from "../../system/utils/createSubdomain"

const { Tenants } = DB



export default class TenantController {
    static async createTenant(req, res) {
        const { name } = req?.body
        const subdomain = await createSubdomain(name)
        console.log({ subdomain })
        try {
            const tenant = await Tenants.create({ name, subdomain })
            Response.success(res, 201, {
                message: "Tenant created",
                tenant
            })
        } catch (error) {
            Response.error(res, 500, error)

        }
    }

    static async getTenants(req, res) {
        try {

            const tenants = await Tenants.findAll()
            Response.success(res, 200, {
                tenants
            })
        } catch (error) {
            Response.error(res, 500, error)
        }

    }

    static async getTenantById(req, res) {
        const { id } = req?.params
        try {
            const tenant = await Tenants.findByPk(id)
            Response.success(res, 200, {
                tenant
            })
        } catch (error) {
            Response.error(res, 500, error)
        }
    }

    static async updateTenant(req, res) {
        const { id } = req?.params
        const { name } = req?.body
        try {
            const tenant = await Tenants.update({ name }, { where: { id } })
            Response.success(res, 200, {
                message: "Tenant updated",
                tenant
            })
        } catch (error) {
            Response.error(res, 500, error)
        }
    }

    static async deleteTenant(req, res) {
        const { id } = req?.params
        try {
            const tenant = await Tenants.destroy({ where: { id } })
            Response.success(res, 200, {
                message: "Tenant deleted",
                tenant
            })
        } catch (error) {
            Response.error(res, 500, error)
        }
    }
}