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
<div className="max-w-xl mx-auto p-4 font-sans">
  <input
    type="text"
    placeholder="Enter Train Number"
    value={trainNo}
    onChange={(e) => setTrainNo(e.target.value)}
    className="w-full p-3 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
  />
  <button
    onClick={fetchTrainInfo}
    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full"
  >
    Search
  </button>

  {loading && <p className="text-yellow-600 mt-4">Loading...</p>}
  {error && <p className="text-red-600 mt-4">{error}</p>}

  {trainInfo && (
    <div className="mt-6 p-4 bg-white text-black rounded-md shadow-md">
      <h3 className="text-xl font-bold mb-2">
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
