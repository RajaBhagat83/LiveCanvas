import z, { email, string } from "zod";

export const CreateUserSchema = z.object({
  id:string(),
  email: z.email().endsWith("@gmail.com"),
  password: z.string().min(3).max(10),
  name:string()
});

export const SiginSchema = z.object({
  email: z.email().endsWith("@gmail.com"),
  password: z.string().min(3).max(10),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(10),
});
