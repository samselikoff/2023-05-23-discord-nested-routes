"use client";

import * as Icons from "@/app/_components/icons";
import { Channel } from "@/app/_lib/data";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

type IconName = keyof typeof Icons;

export function ChannelLink({
  channel,
  activeServerId,
}: {
  channel: Channel;
  activeServerId: number;
}) {
  let [, activeChannelId] = useSelectedLayoutSegments();

  let iconName: IconName = "Hashtag";
  if (channel.icon) {
    iconName = channel.icon as IconName;
  }
  let Icon = Icons[iconName];
  let active = +channel.id === +activeChannelId;
  const state = active
    ? "active"
    : channel.unread
    ? "inactiveUnread"
    : "inactiveRead";
  let classes = {
    active: "text-white bg-gray-550/[0.32]",
    inactiveUnread:
      "text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]",
    inactiveRead:
      "text-gray-300 hover:text-gray-100 hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]",
  };

  return (
    <Link
      href={`/servers/${activeServerId}/channels/${channel.id}`}
      className={`${classes[state]} group relative mx-2 flex items-center rounded px-2 py-1`}
    >
      {state === "inactiveUnread" && (
        <div className="absolute left-0 -ml-2 h-2 w-1 rounded-r-full bg-white"></div>
      )}
      <Icon className="mr-1.5 h-5 w-5 text-gray-400" />
      {channel.label}
      <Icons.AddPerson className="ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
    </Link>
  );
}
