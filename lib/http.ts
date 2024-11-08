import axios, { AxiosInstance } from "axios";
import { getNetworkUrl } from "./utils";
import { storage } from "./storage";

class Http {
  ins: AxiosInstance;

  constructor() {
    this.ins = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_DOMAIN
    });

    this.ins.interceptors.request.use((config) => {
      const token = storage.get("sonic-account-info", "state.token");
      const networkId = storage.get("sonic-network-info", "state.networkId");

      if (networkId) {
        config.url = `${getNetworkUrl(networkId)}${config.url}`;
      }

      if (token) {
        config.headers["Authorization"] = token;
        config.headers["content-type"] = "application/json";
      }
      return config;
    });
  }

  get = async (url: string, params?: Record<string, any>) => {
    const res = await this.ins.get(url, { params });
    return res.data;
  };

  post = async (url: string, data?: any) => {
    const res = await this.ins.post(url, data);
    return res.data;
  };
}

export const http = new Http();
