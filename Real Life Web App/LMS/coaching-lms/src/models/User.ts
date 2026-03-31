import { Permission, RoleName } from "@/lib/rbac/permissions";
import mongoose, { model, models, Schema } from "mongoose";

export interface UserProps {
  _id: mongoose.Types.ObjectId;

  name: string;
  email: string;
  phone?: string;

  role: RoleName;
  roleId?: mongoose.Types.ObjectId;

  extraPermissions: Permission[];
  blockedPermissions: Permission[];

  passwordHash?: string;
  isActive: boolean;

  lastLoginAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}



export type UserDoc = mongoose.HydratedDocument<UserProps>;

const UserSchema = new Schema<UserProps>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    role: { type: String, required: true, default: "student", index: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role" },
    extraPermissions: { type: [String], default: [] },
    blockedPermissions: { type: [String], default: [] },
    passwordHash: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

export const User =
  (models.User as mongoose.Model<UserProps>) || model<UserProps>("User", UserSchema);
