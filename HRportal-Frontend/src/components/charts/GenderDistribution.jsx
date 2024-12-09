import React from "react";

const GenderDistribution = ({ genderData }) => {
  const total = (genderData.Male || 0) + (genderData.Female || 0);

  return (
    <div className="chart-container mb-4">
      <div
        className="text-center"
        style={{
          marginBottom: "10px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        <h4 className="text-center mb-3">Gender Distribution</h4>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "300px",
          height: "300px",
          position: "relative",
          margin: "0 auto",
        }}
      >
        <div
          className="progress-circle"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: `conic-gradient(
              #64b5f6 ${(genderData.Male / total) * 360}deg,
              #FF6347 ${(genderData.Male / total) * 360}deg ${(genderData.Female / total) * 360}deg
            )`,
          }}
        ></div>
        <div
          className="position-absolute bg-white"
          style={{
            width: "70%",
            height: "70%",
            borderRadius: "50%",
          }}
        ></div>
      </div>
      <ul
        className="list-group mt-3"
        style={{ maxWidth: "30%", margin: "0 auto" }}
      >
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ fontSize: "0.9rem" }}
        >
          Male{" "}
          <span
            className="badge rounded-pill"
            style={{
              fontSize: "0.8rem",
              backgroundColor: "#64b5f6", // Male color
              color: "white",
            }}
          >
            {genderData.Male || 0}
          </span>
        </li>
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ fontSize: "0.9rem" }}
        >
          Female{" "}
          <span
            className="badge rounded-pill"
            style={{
              fontSize: "0.8rem",
              backgroundColor: "#FF6347", // Female color
              color: "white",
            }}
          >
            {genderData.Female || 0}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default GenderDistribution;
