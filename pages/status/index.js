import useSWR from "swr";

async function fetchAPI() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText,
    versionAtText,
    maxConnectionsAtText,
    openedConnectionsAtText = "Carregando...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    versionAtText = data.dependencies.database.version;
    maxConnectionsAtText = data.dependencies.database.max_connections;
    openedConnectionsAtText = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <ul>
        <li>Last update: {updatedAtText}</li>
        <li>Database Version: {versionAtText}</li>
        <li>Max Connections: {maxConnectionsAtText}</li>
        <li>Opened Connections: {openedConnectionsAtText}</li>
      </ul>
    </div>
  );
}
