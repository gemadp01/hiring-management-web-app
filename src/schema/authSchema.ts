import { z } from "zod";

const email = z
  .string()
  .email({ message: "Invalid email" })
  .refine((v) => v.toLowerCase().endsWith("@gmail.com"), {
    message: "Email must be a @gmail.com address",
  });

const password = z.string();

export const loginSchema = z.object({
  email,
  password,
});

// Register = login fields + confirmPassword
export const registerSchema = z
  .object({
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password does not match",
    path: ["confirmPassword"], // error muncul di field confirmPassword
  });

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
