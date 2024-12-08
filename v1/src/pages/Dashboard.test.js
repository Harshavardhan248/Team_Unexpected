import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './pages/Dashboard';

jest.mock('./services/api', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        totalEmployees: 100,
        genderDistribution: { Male: 60, Female: 40 },
        departmentCount: { HR: 10, IT: 50, Sales: 40 },
      },
    })
  ),
}));

jest.mock('./components/charts/GenderDistribution', () => () => (
  <div>Gender Distribution Chart</div>
));

jest.mock('./components/charts/DepartmentBarChart', () => () => (
  <div>Department Bar Chart</div>
));

describe('Dashboard Component', () => {
  it('renders the Analytics Dashboard title', async () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/Analytics Dashboard/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the total number of employees', async () => {
    render(<Dashboard />);
    const employeesElement = await screen.findByText('100');
    expect(employeesElement).toBeInTheDocument();
  });

  it('renders the Gender Distribution chart', async () => {
    render(<Dashboard />);
    const genderChart = screen.getByText('Gender Distribution Chart');
    expect(genderChart).toBeInTheDocument();
  });

  it('renders the Department Bar Chart', async () => {
    render(<Dashboard />);
    const departmentChart = screen.getByText('Department Bar Chart');
    expect(departmentChart).toBeInTheDocument();
  });
});
