"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, BellDot } from "lucide-react";
import { markAsRead } from "./actions";

type notificationsType = {
  id: number;
  createdAt: Date | null;
  userId: number | null;
  message: string;
  isRead: boolean;
}[];

export function DropdownMenuCheckboxes({
  notifications,
}: {
  notifications: notificationsType;
}) {
  const isAllRead = notifications.every((notification) => notification.isRead);
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {isAllRead ? <Bell size={"icon"} /> : <BellDot size={"icon"} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length !== 0 ? (
          notifications.map((n, index) => (
            <DropdownMenuItem key={index}>
              {n.message}
              {n.isRead ? (
                <Button disabled={true}>rad</Button>
              ) : (
                <Button onClick={() => markAsRead(n.id)}>Mark as read</Button>
              )}
            </DropdownMenuItem>
          ))
        ) : (
          <p className="font-thin">No notifications</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
