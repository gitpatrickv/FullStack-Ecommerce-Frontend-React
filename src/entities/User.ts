import { z } from "zod";

export interface User {
  email: string;
  name: string;
  address: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const schema = z.object({
    email: z.string().email(),
    name: z.string(),
    address: z.string(),
    contactNumber: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.string(),
  });