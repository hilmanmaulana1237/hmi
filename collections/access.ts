import type { Access, FieldAccess } from "payload";

export const roles = [
  "super_admin",
  "ketua_umum",
  "sekretaris_umum",
  "bendahara_umum",
  "bidang_kaderisasi",
  "bidang_ptkp",
  "bidang_media",
  "editor",
  "viewer",
] as const;

export type AdminRole = (typeof roles)[number];

export const roleOptions = roles.map((role) => ({
  label: role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  value: role,
}));

type MaybeUserWithRoles = {
  id?: number | string;
  roles?: AdminRole[] | null;
};

export function hasRole(user: unknown, allowed: AdminRole[]) {
  const rolesValue = (user as MaybeUserWithRoles | null | undefined)?.roles;
  return Boolean(rolesValue?.some((role) => allowed.includes(role)));
}

export const anyone: Access = () => true;

export const authenticated: Access = ({ req: { user } }) => Boolean(user);

export const authenticatedField: FieldAccess = ({ req: { user } }) =>
  Boolean(user);

export const superAdmins: Access = ({ req: { user } }) =>
  hasRole(user, ["super_admin"]);

export const superAdminsField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, ["super_admin"]);

export const firstUserOrSuperAdmins: Access = async ({ req }) => {
  if (hasRole(req.user, ["super_admin"])) {
    return true;
  }

  const users = await req.payload.find({
    collection: "users",
    depth: 0,
    limit: 1,
    overrideAccess: true,
  });

  return users.totalDocs === 0;
};

export const superAdminsOrSelf: Access = ({ req: { user } }) => {
  if (hasRole(user, ["super_admin"])) {
    return true;
  }

  const id = (user as MaybeUserWithRoles | null | undefined)?.id;

  if (!id) {
    return false;
  }

  return {
    id: {
      equals: id,
    },
  };
};

export const adminsAndChair: Access = ({ req: { user } }) =>
  hasRole(user, ["super_admin", "ketua_umum"]);

export const contentManagers: Access = ({ req: { user } }) =>
  hasRole(user, ["super_admin", "ketua_umum", "bidang_media"]);

export const contentWriters: Access = ({ req: { user } }) =>
  hasRole(user, ["super_admin", "ketua_umum", "bidang_media", "editor"]);

export const contentPublishersField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, ["super_admin", "ketua_umum", "bidang_media"]);

export const cadreManagers: Access = ({ req: { user } }) =>
  hasRole(user, ["super_admin", "ketua_umum", "sekretaris_umum"]);

export const lk1Managers: Access = ({ req: { user } }) =>
  hasRole(user, [
    "super_admin",
    "ketua_umum",
    "bendahara_umum",
    "bidang_kaderisasi",
  ]);

export const advocacyManagers: Access = ({ req: { user } }) =>
  hasRole(user, ["super_admin", "ketua_umum", "bidang_ptkp"]);

export const documentManagers: Access = ({ req: { user } }) =>
  hasRole(user, [
    "super_admin",
    "ketua_umum",
    "sekretaris_umum",
    "bidang_kaderisasi",
  ]);

export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    status: {
      equals: "published",
    },
  };
};

export const publicCadresOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    isPublic: {
      equals: true,
    },
  };
};

export const publicPublishedCheckboxOrAuthenticated: Access = ({
  req: { user },
}) => {
  if (user) {
    return true;
  }

  return {
    isPublished: {
      equals: true,
    },
  };
};

export const publicActiveCheckboxOrAuthenticated: Access = ({
  req: { user },
}) => {
  if (user) {
    return true;
  }

  return {
    isActive: {
      equals: true,
    },
  };
};
