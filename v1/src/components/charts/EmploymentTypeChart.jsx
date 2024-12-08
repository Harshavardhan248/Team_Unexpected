import React from "react";

const EmploymentTypeChart = ({ employmentData }) => {
  // Get the keys and values from the employmentData object
  const employmentTypes = Object.keys(employmentData);
  const employmentCounts = Object.values(employmentData);

  return (
    <div className="employment-type-chart">
      <h4>Employment Types</h4>
      <div className="chart-container">
        <div className="chart">
          {employmentTypes.map((type, index) => (
            <div key={type} className="chart-bar">
              <div
                className="bar"
                style={{
                  height: `${employmentCounts[index] * 10}px`,
                  backgroundColor: "#007bff",
                }}
              >
                <span className="bar-label">{employmentCounts[index]}</span>
              </div>
              <span className="bar-type">{type}</span>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          .employment-type-chart {
            text-align: center;
            margin: 20px 0;
          }
          .chart-container {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            height: 300px;
            border: 1px solid #ddd;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .chart {
            display: flex;
            gap: 15px;
          }
          .chart-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .bar {
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            color: white;
            font-weight: bold;
            transition: height 0.3s;
          }
          .bar-label {
            margin-bottom: 5px;
          }
          .bar-type {
            margin-top: 5px;
            font-size: 14px;
            color: #555;
          }
        `}
      </style>
    </div>
  );
};

export default EmploymentTypeChart;
