import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { connectDB } from "@/lib/db/connect";
import type { UserProps } from "@/models/User";
import { User as UserModel } from "@/models/User";
import type { RoleProps } from "@/models/Role";
import { Role } from "@/models/Role";
import { verifyPassword } from "@/lib/auth/password";
// import { JWT } from "next-auth/jwt";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        await connectDB();

        const user = await UserModel.findOne({ email }).lean<UserProps | null>();
        if (!user || !user.isActive) return null;

        if (!user.passwordHash) return null;
        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) return null;

        let rolePerms: string[] = [];
        if (user.roleId) {
          const roleDoc = await Role.findById(user.roleId).lean<RoleProps | null>();
          rolePerms = roleDoc?.permissions ?? [];
        }

        const merged = new Set<string>([
          ...rolePerms,
          ...(user.extraPermissions ?? []),
        ]);
        for (const p of user.blockedPermissions ?? []) merged.delete(p);

        // ✅ This object is now typed as next-auth "User" because of module augmentation
        return {
          id: String(user._id),
          name: user.name ?? null,
          email: user.email ?? null,
          role: user.role,
          permissions: Array.from(merged),
        };
      },
    }),
  ],

  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.uid = user.id as string;
      token.role = user.role;
      token.permissions = user.permissions;
    }
    return token;
  },

  async session({ session, token }) {
    // TypeScript will now recognize token.uid because of the augmentation
    if (session.user) {
      session.user.id = token.uid;
      session.user.role = token.role;
      session.user.permissions = token.permissions;
    }
    return session;
  },
},


  pages: {
    signIn: "/login",
  },
});
