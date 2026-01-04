import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  books: defineTable({
    title: v.object({
      uz: v.string(),
      en: v.string(),
      ru: v.string(),
    }),
    description: v.object({
      uz: v.string(),
      en: v.string(),
      ru: v.string(),
    }),
    format: v.union(v.literal("PDF"), v.literal("ePub")),
    language: v.string(),
    coverUrl: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    category: v.string(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
