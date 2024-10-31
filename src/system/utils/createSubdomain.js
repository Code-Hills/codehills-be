import DB from "../../database";
import TenantService from "../../services/TenantService";
const { Tenant } = DB;

export default async (name) => {

    let subdomain = name.toLowerCase().replace(/[^a-z0-9]/g, '');


    let isUnique = false;
    let counter = 1;

    try {
        while (!isUnique) {
            const existingTenant = await TenantService.findOneTenant({ subdomain });

            if (!existingTenant) {
                isUnique = true;
            } else {

                subdomain = `${subdomain}${counter}`;
                counter++;
            }
        }

    } catch (error) {
        throw new Error(error);

    }
    console.log({ subdomain });
    return subdomain;
};