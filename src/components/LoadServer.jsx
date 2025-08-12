import React, { useEffect } from "react";
import axios from "axios";

const LoadServer = () => {
  useEffect(() => {
    const pingServer = async () => {
      try {
        await axios.get("https://books-server-5p0q.onrender.com/");
        console.log("Server pinged successfully");
      } catch (error) {
        console.error("Error pinging server:", error);
      }
    };

    pingServer();

    // Then ping every 2 minutes
    const interval = setInterval(pingServer, 120000);

    return () => clearInterval(interval);
  }, []);

  return <div>LoadServer</div>;
};

export default LoadServer;
