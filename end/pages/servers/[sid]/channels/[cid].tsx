import { Channel, Message, data } from "@/lib/data";
import * as Icons from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

export default function Server() {
  let [closedCategories, setClosedCategories] = useState<number[]>([]);
  let router = useRouter();
  let server = data.find((server) => server.id.toString() === router.query.sid);

  if (!server) {
    return null;
  }

  const channel = server.categories
    .map((c) => c.channels)
    .flat()
    .find((channel) => channel.id.toString() === router.query.cid);

  if (!channel) {
    return null;
  }

  function toggleCategory(categoryId: number) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId]
    );
  }

  return (
    <>
      <div className="hidden w-60 flex-col bg-gray-800 md:flex">
        <button className="flex h-12 items-center px-4 font-title text-[15px] font-semibold text-white shadow-sm transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="absolute h-4 w-4 text-gray-550" />
            <Icons.Check className="absolute h-4 w-4" />
          </div>
          Tailwind CSS
          <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
        </button>

        <div className="flex-1 space-y-[21px] overflow-y-scroll pt-3 font-medium text-gray-300">
          {server.categories.map((category) => (
            <div key={category.id}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center px-0.5 font-title text-xs uppercase tracking-wide hover:text-gray-100"
                >
                  <Icons.Arrow
                    className={`${
                      closedCategories.includes(category.id) ? "-rotate-90" : ""
                    } mr-0.5 h-3 w-3 transition duration-200`}
                  />
                  {category.label}
                </button>
              )}

              <div className="mt-[5px] space-y-0.5">
                {category.channels
                  .filter((channel) => {
                    let categoryIsOpen = !closedCategories.includes(
                      category.id
                    );

                    return categoryIsOpen || channel.unread;
                  })
                  .map((channel) => (
                    <ChannelLink channel={channel} key={channel.id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700">
        <div className="flex h-12 items-center px-2 shadow-sm">
          <div className="flex items-center">
            <Icons.Hashtag className="mx-2 h-6 w-6 font-semibold text-gray-400" />
            <span className="mr-2 whitespace-nowrap font-title text-white">
              {channel.label}
            </span>
          </div>

          {channel.description && (
            <>
              <div className="mx-2 hidden h-6 w-px bg-white/[.06] md:block"></div>
              <div className="mx-2 hidden truncate text-sm font-medium text-gray-200 md:block">
                {channel.description}
              </div>
            </>
          )}

          {/* Mobile buttons */}
          <div className="ml-auto flex items-center md:hidden">
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="mx-2 h-6 w-6" />
            </button>
          </div>

          {/* Desktop buttons */}
          <div className="ml-auto hidden items-center md:flex">
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Bell className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Pin className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="mx-2 h-6 w-6" />
            </button>
            <div className="relative mx-2">
              <input
                type="text"
                placeholder="Search"
                className="h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Icons.Spyglass className="mr-1.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Inbox className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.QuestionCircle className="mx-2 h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll">
          {channel.messages.map((message, i) => (
            <div key={message.id}>
              {i === 0 || message.user !== channel.messages[i - 1].user ? (
                <MessageWithUser message={message} />
              ) : (
                <Message message={message} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

type IconName = keyof typeof Icons;

function ChannelLink({ channel }: { channel: Channel }) {
  let iconName: IconName = "Hashtag";
  if (channel.icon) {
    iconName = channel.icon as IconName;
  }
  let Icon = Icons[iconName];

  let router = useRouter();
  let server = data.find((server) => server.id.toString() === router.query.sid);
  let active = channel.id.toString() === router.query.cid;

  const state = active
    ? "active"
    : channel.unread
    ? "inactiveUnread"
    : "inactiveRead";

  const classes = {
    active: "text-white bg-gray-550/[0.32]",
    inactiveUnread:
      "text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]",
    inactiveRead:
      "text-gray-300 hover:text-gray-100 hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]",
  };

  return (
    <Link
      href={`/servers/${server?.id}/channels/${channel.id}`}
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

function MessageWithUser({ message }: { message: Message }) {
  return (
    <div className="mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]">
      <Image
        className="mr-4 mt-0.5 h-10 w-10 rounded-full"
        src={message.avatarUrl}
        width={40}
        height={40}
        alt=""
      />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 text-[15px] font-medium text-white">
            {message.user}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            {message.date}
          </span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }: { message: Message }) {
  return (
    <div className="py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]">
      <p className="pl-14 text-gray-100">{message.text}</p>
    </div>
  );
}
