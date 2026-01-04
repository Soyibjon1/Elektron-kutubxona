import { query } from "./_generated/server";

export const getBooks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});
