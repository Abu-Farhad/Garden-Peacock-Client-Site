import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// auth
export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/me"),
};

// dashboard/admin
export const adminApi = {
  teachers: (params = {}) => api.get("/admin/teachers", { params }),
  assignTeacherToLead: (leadId, payload) =>
    api.patch(`/admin/leads/${leadId}/assign`, payload),
  unlockLeadContact: (leadId, payload = {}) =>
    api.patch(`/admin/leads/${leadId}/unlock-contact`, payload),
  updateTeacher: (teacherProfileId, payload) =>
    api.patch(`/admin/teachers/${teacherProfileId}`, payload),
};

// leads
export const leadsApi = {
  list: (params = {}) => api.get("/leads", { params }),
  getById: (id) => api.get(`/leads/${id}`),
  update: (id, payload) => api.patch(`/leads/${id}`, payload),
  activities: (id, params = {}) => api.get(`/leads/${id}/activities`, { params }),
  addActivity: (id, payload) => api.post(`/leads/${id}/activities`, payload),
  suggestions: (id) => api.get(`/leads/${id}/suggestions`),
};

// followups
export const followupsApi = {
  list: (params = {}) => api.get("/followups", { params }),
};

export default api;