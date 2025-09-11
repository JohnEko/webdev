'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { success, unknown } from "zod";


export const getNotifications = async () => {
  const session = await auth();

  if (!session?.user) {
    return { error: "Not logged in!" };
  }

  const userId = session?.user.userId;

  try {
    const notifications = await db.notification.findMany({
      where: { recipientId: userId },
      include: {
        sender: {
          select: {
            name: true,
            id: true,
          },
        },
        blog: {
          select: {
            id: true,
            title: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            blogId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    //to delete notification
    const count = await db.notification.count({
      where: { recipientId: userId, isRead: false },
    });
    //to delete notification
    if (count > 100) {
      const oldNotification = await db.notification.findMany({
        where: { recipientId: userId },
        orderBy: { createdAt: "desc" },
        skip: 100,
        select: { id: true },
      });
      const oldNotificationsId = oldNotification.map((n) => n.id);

      await db.notification.deleteMany({
        where: { id: { in: oldNotificationsId } },
      });
    }

    const unreadCount = await db.notification.count({
      where: { recipientId: userId, isRead: false },
    });

    const formattedNotification = notifications.map(n => {
      let content = "";

      switch (n.type) {
        case "NEW_COMMENT":
          content = `${
            n.sender.name || "Someone"
          } commented on your blog post: "${n.blog?.title}"`;
          break;
        case "COMMENT_REPLY":
          content = `${
            n.sender.name || "Someone"
          } replied on your blog post: "${n.comment?.content}"`;
          break;
        case "NEW_CLAP":
          content = `${n.sender.name || "Someone"} clap your blog post: "${
            n.blog?.title
          }"`;
          break;

        case "FOLLOW":
          content = `${n.sender.name || "Someone"} followed you: `;
          break;

        case "SYSTEM_ALERT":
          content = `System Alert: "${n.content}"`;
          break;

        default:
          content = `New notification from: "${n.sender.name || unknown}"`;
          break;
      }

      return {
        ...n,
        content,
      };
    });

    return {
      success: {
        notifications: formattedNotification,
        unreadNotificationCount: unreadCount,
      },
    };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch notifications" };
  }
};
