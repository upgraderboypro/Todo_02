const { z } = require("zod");

// Creating an object for schema
const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters..." })
    .max(30, {
      message: "Name must not be more than 30 characters",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Name must be at least 3 characters..." }),
  // phone: z
  //   .string({ required_error: "Phone no is required" })
  //   .trim()
  //   .min(10, { message: "Phone no must be at least 10 characters..." })
  //   .max(20, {
  //     message: "Phone no must not be more than 20 characters",
  //   }),
  pass: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(10, { message: "Password must be at least 10 characters..." })
    .max(20, {
      message: "Password must not be more than 20 characters",
    }),
  cpass: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(10, { message: "Password must be at least 10 characters..." })
    .max(20, {
      message: "Password must not be more than 30 characters",
    }),
});
const contactSchema = z.object({
  name: z
    .string({ required_error: "Name must be provided" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters..." })
    .max(30, {
      message: "Name must not be more than 30 characters",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Name must be at least 3 characters..." }),
  message: z
    .string({ required_error: "Message is required" })
    .trim().min(3, { message: "Message must be at least 3 characters..." })
    .max(1000, {
      message: "Message must not be more than 1000 characters",
    }),
});
module.exports = { signupSchema, contactSchema };
