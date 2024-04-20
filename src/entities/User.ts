import { z } from "zod";

export const schema = z.object({
    email: z.string().email(),
    name: z.string(),
    address: z.string(),
    contactNumber: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.string(),
  });