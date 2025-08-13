import pool from "../../db/pool.js";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT u."Id" AS user_id,
            u."FullName",
            u."Email",
            u."PasswordHash",
            array_agg(r."Name") AS roles
     FROM "Users" u
     JOIN "UserRoles" ur ON u."Id" = ur."UsersId"
     JOIN "Roles" r ON ur."RolesId" = r."Id"
     WHERE u."Email" = $1
     GROUP BY u."Id", u."Email";`,
    [email]
  );

  return rows[0];
};
