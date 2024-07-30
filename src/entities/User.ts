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
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    contactNumber: z.string().min(1, "Contact Number is required"),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    role: z.string().min(1, "Role is required"),
  });