import client from "./axiosClient";

export const fetchLogs = () => client.get("/admin/logs");
