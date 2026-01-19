import { Permission, RoleName } from "@/lib/rbac/permissions";
import mongoose, { model, models, Schema } from "mongoose";


export interface IRole extends mongoose.Document{
    name:RoleName;
    permissions:Permission[];
    isSystem:boolean;
}

const RoleSchema=new Schema<IRole>(
    {
        name:{type:String,required:true,unique:true,index:true},
        permissions:{type:[String],default:[]},
        isSystem:{type:Boolean,default:false}
    },
    {
        timestamps:true
    }
)

export const Role=models.Role || model<IRole>("Role",RoleSchema)