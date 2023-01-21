import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI || "",
  AUTH0: {
    JWKSURI: process.env.JWKSURI || "",
    AUDIENCE: process.env.AUDIENCE || "",
    ISSUER: process.env.ISSUER || "",
  },
};
