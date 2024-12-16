import prisma from "../../lib/prisma";

export const deleteBlogService = async (id: number, userId: number) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: { id },
    });

    if (!blog) {
      throw new Error("Blog not found.");
    }

    if (blog.userId !== userId) {
      throw new Error("You are not authorized to delete this blog.");
    }

    await prisma.blog.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: "Blog deleted successfully." };
  } catch (error) {
    throw error;
  }
};
