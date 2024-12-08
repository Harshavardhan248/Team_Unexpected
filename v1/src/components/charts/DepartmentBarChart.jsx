import React from "react";

const DepartmentBarChart = ({ departmentData }) => {
  const maxCount = Math.max(...Object.values(departmentData));
  const totalEmployees = Object.values(departmentData).reduce((sum, count) => sum + count, 0);

  return (
    <div className="chart-container mb-4" style={{ width: "80%", margin: "0 auto" }}>
      <h4 className="text-center mb-3">Department Wise Employees</h4>
      <div className="mb-4">
        <div className="d-flex justify-content-between">
          <h5>Total Employees</h5>
          <h5>{totalEmployees}</h5>
        </div>
      </div>
      <div>
        {Object.entries(departmentData).map(([department, count]) => (
          <div key={department} className="mb-2">
            <div className="d-flex justify-content-between">
              <span>{department}</span>
              <span>{count}</span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${(count / maxCount) * 100}%`,
                  backgroundColor: "#64b5f6", // Blue color for individual departments
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentBarChart;
