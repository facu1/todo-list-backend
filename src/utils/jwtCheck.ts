import { expressjwt, GetVerificationKey } from "express-jwt";
import jwks from "jwks-rsa";
import { config } from "../config";

export const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.AUTH0.JWKSURI,
  }) as GetVerificationKey,
  audience: config.AUTH0.AUDIENCE,
  issuer: config.AUTH0.ISSUER,
  algorithms: ["RS256"],
});
