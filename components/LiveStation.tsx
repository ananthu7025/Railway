/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const TrainInfoSearch = () => {
  const [trainNo, setTrainNo] = useState("");
  const [trainInfo, setTrainInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrainInfo = async () => {
    if (!trainNo) {
      setError("Please enter a train number.");
      return;
    }

    setLoading(true);
    setError("");
    setTrainInfo(null);

    const apiKey = "8a592026e5208012abf939bc6031a0fb";
    const url = `https://indianrailapi.com/api/v2/TrainInformation/apikey/${apiKey}/TrainNumber/${trainNo}/`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.ResponseCode === "200") {
        setTrainInfo(data); // 👈 fix here
      } else {
        setError(data.Message || "Failed to fetch train information.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>🚆 Train Information</h2>
      <input
        type="text"
        placeholder="Enter Train Number"
        value={trainNo}
        onChange={(e) => setTrainNo(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 10 }}
      />
      <button onClick={fetchTrainInfo} style={{ padding: "10px 20px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {trainInfo && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 8,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            {trainInfo.TrainName} ({trainInfo.TrainNo})
          </h3>
          <p>
            <strong>From:</strong> {trainInfo.Source?.Code} (Arr: {trainInfo.Source?.Arrival})
          </p>
          <p>
            <strong>To:</strong> {trainInfo.Destination?.Code} (Arr: {trainInfo.Destination?.Arrival})
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainInfoSearch;
