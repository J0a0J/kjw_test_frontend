import axios from "axios";

// API 클라이언트 생성
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // Vue CLI 환경 변수 방식 사용
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
