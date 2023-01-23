import * as dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  AUTH0: {
    JWKSURI: process.env.JWKSURI || "",
    AUDIENCE: process.env.AUDIENCE || "",
    ISSUER: process.env.ISSUER || "",
  },
};

export default config;
