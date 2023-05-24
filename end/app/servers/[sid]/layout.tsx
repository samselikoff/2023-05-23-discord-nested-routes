"use client";

import * as Icons from "@/components/icons";
import { data } from "@/lib/data";
import { ReactNode, useState } from "react";
import { ChannelLink } from "./channel-link";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { sid: string };
}) {
  const server = data.find((server) => +server.id === +params.sid);

  let [closedCategories, setClosedCategories] = useState<number[]>([]);
  function toggleCategory(categoryId: number) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId]
    );
  }

  if (!server) {
    return null;
  }

  return (
    <>
      <div className="hidden w-60 flex-col bg-gray-800 md:flex">
        <button className="flex h-12 items-center px-4 font-title text-[15px] font-semibold text-white shadow-sm transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="absolute h-4 w-4 text-gray-550" />
            <Icons.Check className="absolute h-4 w-4" />
          </div>
          {server.label}
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
                    <ChannelLink
                      channel={channel}
                      activeServerId={+params.sid}
                      key={channel.id}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {children}
    </>
  );
}
