import { useEffect, useState } from "react";
import agent from "../../app/api/agent";

export default function SystemStatus() {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await agent.SystemStatus.getSystemStatus();

        if (!response.length) {
          throw new Error("Failed to fetch system status.");
        }
        setData(response);
      } catch (Error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Database Version</h1>
      <p>{data}</p>
    </div>
  );

  return (
    <>
      <h1>This is the System Status Page</h1>
    </>
  );
}
