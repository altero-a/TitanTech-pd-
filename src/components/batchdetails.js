import React, { useEffect, useState } from "react";

const BatchDetailsPage = ({ csvData, filteredData, batchOptions }) => {
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    // Ensure filterDataByDate is either passed as a prop or handled inside useEffect
    if (filteredData) {
      setBatchData(filteredData);  // or whatever logic you have to extract batch data
    }
  }, [filteredData]);  // Add filteredData as dependency

  return (
    <div>
      <h1>Batch Details</h1>
      {/* Add your table and batch display code here */}
    </div>
  );
};

export default BatchDetailsPage;
