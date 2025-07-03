import database from "infra/database";
import { ValidationError, NotFoundError } from "infra/error";

async function findOneByUsername(username) {
  const userfound = await runSelectQuery(username);
  return userfound;

  async function runSelectQuery(username) {
    const results = await database.query({
      text: `
        SELECT 
          *
        FROM 
          users
        WHERE 
          LOWER(username) = LOWER($1)
        ;`,
      values: [username],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "The username was not found.",
        action: "Check if the username is correctly.",
      });
    }
    return results.rows[0];
  }
}

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);
  await validateUniqueUsername(userInputValues.userName);
  const newUser = await runInsertQuery(userInputValues);
  return newUser;

  async function validateUniqueEmail(email) {
    const results = await database.query({
      text: `
        SELECT 
          email
        FROM 
          users
        WHERE 
          LOWER(email) = LOWER($1)
        LIMIT
          1
        ;`,
      values: [email],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "Email already exists.",
        action: "Use another email to add a new user.",
      });
    }
  }

  async function validateUniqueUsername(userName) {
    const results = await database.query({
      text: `
        SELECT 
          email
        FROM 
          users
        WHERE 
          LOWER(username) = LOWER($1)
        ;`,
      values: [userName],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "Username already exists.",
        action: "Use another username to add a new user.",
      });
    }
  }

  async function runInsertQuery(userInputValues) {
    const results = await database.query({
      text: `
        INSERT INTO 
          users (username, email, password) 
        VALUES 
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.userName,
        userInputValues.email,
        userInputValues.password,
      ],
    });
    return results.rows[0];
  }
}

const user = { create, findOneByUsername };

export default user;
