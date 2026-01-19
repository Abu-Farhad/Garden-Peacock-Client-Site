// import "dotenv/config"
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { connectDb } from "@/lib/db/connect"
import { Role } from "@/models/Role"
import { User } from "@/models/User"
import { PERMISSIONS } from "@/lib/rbac/permissions"
import { hashPassword } from "@/lib/auth/password"

async function main() {
    const email = process.env.SUPERADMIN_EMAIL;
    const password = process.env.SUPERADMIN_PASSWORD
    const name = process.env.SUPERADMIN_NAME

    if (!email || !password) {
        throw new Error("Missing SUPERADMIN_EMAIL or SUPERADMIN_PASSWORD in .env.local");
    }

    await connectDb();

    const superRole = await Role.findOneAndUpdate(
        { name: "superadmin" }, { name: "superadmin", permissions: PERMISSIONS, isSystem: true }, { upsert: true, new: true }
    )

    const existing=await User.findOne({email});

    if(existing){
        existing.role="superadmin";
        existing.roleId=superRole._id;
        existing.extraPermissions=[];
        existing.blockedPermissions=[];
        existing.isActive=true;

        existing.passwordHash=await hashPassword(password)

        await existing.save();
        console.log("Updated existing superAdmin:",email)
    }
    else{
        const passwordHash=await hashPassword(password);

        await User.create({
            name,email,role:"superadmin",roleId:superRole._id,
            extraPermissions:[],
            blockedPermissions:[],
            passwordHash,
            isActive:true,
        });
        console.log("Created SuperADmin:",email);
    }
    process.exit(0);
}

main().catch((err)=>{
    console.error("Seed failed:",err);
    process.exit(1)
})

