import type { CollectionConfig } from "payload";
import {
  authenticated,
  firstUserOrSuperAdmins,
  roleOptions,
  superAdmins,
  superAdminsField,
  superAdminsOrSelf,
} from "./access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: "Admin",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "roles"],
  },
  access: {
    create: firstUserOrSuperAdmins,
    read: authenticated,
    update: superAdminsOrSelf,
    delete: superAdmins,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== "create") {
          return data;
        }

        const users = await req.payload.find({
          collection: "users",
          depth: 0,
          limit: 1,
          overrideAccess: true,
        });

        if (users.totalDocs === 0) {
          return {
            ...data,
            roles: ["super_admin"],
            isActive: true,
          };
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["viewer"],
      options: roleOptions,
      saveToJWT: true,
      access: {
        update: superAdminsField,
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
