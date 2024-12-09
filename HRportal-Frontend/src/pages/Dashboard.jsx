import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import GenderDistribution from "../components/charts/GenderDistribution";
import DepartmentBarChart from "../components/charts/DepartmentBarChart";
import api from "../services/api";

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [chartsData, setChartsData] = useState({
    genderData: {},
    departmentData: {},
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/employees/statistics");
        setAnalyticsData(response.data);
        setChartsData({
          genderData: response.data.genderDistribution || {},
          departmentData: response.data.departmentCount || {},
        });
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{analyticsData.totalEmployees || 0}</Typography>
              <Typography color="text.secondary">Employees</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                {Object.keys(chartsData.departmentData).length || 0}
              </Typography>
              <Typography color="text.secondary">Departments</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                {Object.entries(chartsData.genderData)
                  .map(([gender, count]) => `${gender}: ${count}`)
                  .join(", ") || "N/A"}
              </Typography>
              <Typography color="text.secondary">Gender Distribution</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <GenderDistribution genderData={chartsData.genderData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DepartmentBarChart departmentData={chartsData.departmentData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
