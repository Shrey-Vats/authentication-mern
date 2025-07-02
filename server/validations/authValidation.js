import { z } from "zod";

export const registerValidation = (req, res, next) => {
  const registerSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password should be atleast 8 cherecter long"),
  });

  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid validation",
      error: validation.error.message,
      success: true,
    });
  }

  next();
};

export const loginValidation = (req, res, next) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password should be atleast 8 cherecter long"),
  });

  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid validation",
      error: validation.error.message,
      success: true,
    });
  }

  next();
};
