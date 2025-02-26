import database from "infra/database.js";
import { InternalServerError } from "infra/error";

async function status(request, response) {
  try {
    const databaseVersionResult = await database.query("SHOW server_version");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query(
      "SHOW max_connections",
    );
    const databaseMaxConnectionsValue =
      databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const databaseOpenConnectionsResult = await database.query({
      text: "select count(*)::int as opened_connections from pg_stat_activity where datname = $1;",
      values: [databaseName],
    });
    const databaseOpenConnectionsValue =
      databaseOpenConnectionsResult.rows[0].opened_connections;

    const updateAt = new Date().toISOString();

    response.status(200).json({
      updated_at: updateAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(databaseMaxConnectionsValue),
          opened_connections: databaseOpenConnectionsValue,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\nError inside database.js catch: ");
    console.log(publicErrorObject);
    response.status(500).json(publicErrorObject);
  }
}

export default status;
