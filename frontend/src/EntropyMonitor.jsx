import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const EntropyMonitor = () => {
  const [entropy, setEntropy] = useState(null);

  useEffect(() => {
    const fetchEntropy = async () => {
      const response = await axios.get("http://localhost:5000/api/entropy");
      setEntropy(response.data.entropy);
    };

    fetchEntropy();
    const interval = setInterval(fetchEntropy, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Entropy Monitor</h1>
      <p>Entropy: {entropy !== null ? entropy : "Loading..."}</p>
    </div>
  );
};

export default EntropyMonitor;
