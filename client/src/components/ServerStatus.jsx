import { useEffect, useState, useCallback } from "react";

const API_URL = "https://project-form-2yll.onrender.com";

function ServerStatus() {

  const [status, setStatus] = useState("checking");

  const checkServer = useCallback(async () => {
    try {

      await fetch(API_URL, {
        method: "GET",
        mode: "no-cors"
      });

      setStatus("online");

    } catch (error) {

      console.log("Server wake check failed:", error);
      setStatus("checking");

    }
  }, []);

  useEffect(() => {

    // run first check safely
    const first = setTimeout(checkServer, 0);

    // repeat every 20 seconds
    const interval = setInterval(checkServer, 30000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };

  }, [checkServer]);

  return (
    <div className="server-status">

      {status === "checking" && (
        <span>🟡 Waking backend...</span>
      )}

      {status === "online" && (
        <span className="status online">
          <span className="status-dot"></span>
          🟢 Backend Online
        </span>
      )}

    </div>
  );
}

export default ServerStatus;