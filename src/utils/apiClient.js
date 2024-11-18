import axios from "axios";
import { useState, useEffect } from "react";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;