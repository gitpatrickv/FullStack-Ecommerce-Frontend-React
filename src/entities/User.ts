import { z } from "zod";

export interface User {
  email: string;
  name: string;
  address: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  photoUrl: string;
}

export const schema = z.object({
    email: z.string().email(),
    name: z.string(),
    address: z.string(),
    contactNumber: z.string(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    role: z.string(),
  });