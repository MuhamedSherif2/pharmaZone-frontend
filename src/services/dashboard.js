import Cookies from "js-cookie";

const url = import.meta.env.VITE_API_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = Cookies.get("pharmaZone");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Get dashboard data based on user role
export const getDashboardService = async () => {
  const token = Cookies.get("pharmaZone");
  const response = await fetch(`${url}/api/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch dashboard data");
  }

  return data;
};

// Get user dashboard
export const getUserDashboardService = async () => {
  const token = Cookies.get("pharmaZone");
  const response = await fetch(`${url}/api/dashboard/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user dashboard");
  }

  return data;
};

// Get pharmacy dashboard
export const getPharmacyDashboardService = async () => {
  const token = Cookies.get("pharmaZone");
  const response = await fetch(`${url}/api/dashboard/pharmacy`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch pharmacy dashboard");
  }

  return data;
};

// Get admin dashboard
export const getAdminDashboardService = async () => {
  const token = Cookies.get("pharmaZone");
  const response = await fetch(`${url}/api/dashboard/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch admin dashboard");
  }

  return data;
};

