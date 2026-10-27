import { useEffect, useState } from "react";

type ApiStatus = "checking" | "ok" | "unavailable";

const statusLabel: Record<ApiStatus, string> = {
  checking: "verificando...",
  ok: "online",
  unavailable: "fora do ar",
};

export default function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    fetch("/api/health")
      .then((response) => setApiStatus(response.ok ? "ok" : "unavailable"))
      .catch(() => setApiStatus("unavailable"));
  }, []);

  return (
    <main>
      <h1>CVEtrail</h1>
      <p>Monitoramento de vulnerabilidades nas dependências dos seus repositórios.</p>
      <p className={`status status-${apiStatus}`}>API: {statusLabel[apiStatus]}</p>
    </main>
  );
}
