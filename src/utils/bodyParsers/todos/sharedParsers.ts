import { baseErrorMsg } from "../baserErrorMsg";
import { isString } from "../typeGuards";

export const parseDescription = (description: unknown): string | undefined => {
  if (!description) return undefined;

  if (!isString(description))
    throw new Error(`${baseErrorMsg} description: ${description}`);

  return description;
};
