interface UrlConfig {
  url: string;
  port: number;
  port_front: number;
}

const urlConfig: UrlConfig = {
  url: "http://localhost",
  port: 3000,
  port_front: 5173,
};

export default urlConfig;