import database from "infra/database.js";

async function status(request, response) {
  const databaseVersionResult = await database.query("SHOW server_version");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenConnectionsResult = await database.query(
    "select count(*)::int as opened_connections from pg_stat_activity where datname = 'local_db'",
  );
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
}

export default status;
