export const PERMISSIONS = [
  "course:create", "course:update", "course:delete",
  "module:create", "module:update", "module:delete",
  "lesson:create", "lesson:update", "lesson:delete",
  "notes:upload", "notes:delete",
  "student:read", "student:update", "student:delete",
  "enrollment:approve", "enrollment:remove",
  "payment:read", "payment:refund",
  "notice:create", "notice:update", "notice:delete",
  "admin:create", "admin:update", "admin:delete",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_NAMES = ["student", "admin", "superadmin"] as const;
export type RoleName = (typeof ROLE_NAMES)[number];
