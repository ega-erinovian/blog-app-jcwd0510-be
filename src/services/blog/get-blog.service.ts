import prisma from "../../lib/prisma";

export const getBlogService = async (id: number) => {
  try {
    const blog = prisma.blog.findFirst({
      where: { id },
      include: {
        user: { select: { name: true } },
      },
    });

    if (!blog) {
      throw new Error("Blog not found.");
    }

    return blog;
  } catch (error) {
    throw error;
  }
};
