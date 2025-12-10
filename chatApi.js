import client from "./axiosClient";

export const sendMessage = (query) => client.post("/chat", { query });
