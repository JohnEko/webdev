"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Blog, Comment, Notification } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { getNotifications } from "@/actions/notifications/getNotifications";
import { cn } from "@/lib/utils";
import moment from "moment";

export type LatestNotification = Notification & {
    blog: Pick<Blog, "id" | "title"> | null;
    comment: Pick<Comment, "id" | "content" | "blogId"> | null;
  }
//SENDING NOTIFICATION
const Notifications = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [notifications, setNotifications] = useState<LatestNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('>>>>>>', notifications)


  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getNotifications();
        if (res.success) {
          setNotifications(res.success.notifications);
          setUnreadCount(res.success.unreadNotificationCount);
        }

        if (res.error) {
          setError(res.error);
        }
      } catch (error: any) {
        setError(error.messsage || "An error occured");
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, []);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <div className="absolute bg-rose-500 h-6 w-6 rounded-full text-sm flext items-center justify-center bottom-2 left-2">
            <span>{unreadCount}</span>
          </div>
          <Bell size={20} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[100%] max-w-[400px]">
          <div className="flex gap-4 justify-between mb-2 p-2">
            <h3 className="font-bold text-lg">Notification</h3>
            <button>Mark all as read</button>
          </div>
          {loading && <DropdownMenuItem>
            <div className="text-sm text-gray-500">Loading...</div>
          </DropdownMenuItem>}

          {error && <DropdownMenuItem>
            <div className="text-sm text-rose-500">{error}</div>
          </DropdownMenuItem>}

          {!loading && !error && !!notifications.length && notifications.map((n) => {
            return <DropdownMenuItem key={n.id} className={cn('text-sm cursor-pointer mb-4 flex flex-col items-start border',
                !n.isRead && "bg-secondary"
            )}>
                <div>{n.content}</div>
                <span className="">{moment(new Date(n.createdAt)).fromNow()}</span>
            </DropdownMenuItem>
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
