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
      <DatabaseStatus />
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";
  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <ul>
          <li>
            Last update: {new Date(data.updated_at).toLocaleString("pt-BR")}
          </li>
          <li>Database Version: {data.dependencies.database.version}</li>
          <li>Max Connections: {data.dependencies.database.max_connections}</li>
          <li>
            Opened Connections: {data.dependencies.database.opened_connections}
          </li>
        </ul>
      </>
    );
  }

  return <div>{databaseStatusInformation}</div>;
}
