import { Permission, RoleName } from "@/lib/rbac/permissions";
import mongoose, { model, models, Schema } from "mongoose";

export interface RoleProps {
  name: RoleName;
  permissions: Permission[];
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export type RoleDoc = mongoose.HydratedDocument<RoleProps>;

const RoleSchema = new Schema<RoleProps>(
  {
    name: { type: String, required: true, unique: true, index: true },
    permissions: { type: [String], default: [], required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Role =
  (models.Role as mongoose.Model<RoleProps>) || model<RoleProps>("Role", RoleSchema);
