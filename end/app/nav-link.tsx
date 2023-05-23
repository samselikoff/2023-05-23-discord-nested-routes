"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { ReactNode } from "react";

export function NavLink({
  href,
  serverId,
  children,
}: {
  href: string;
  serverId?: number;
  children: ReactNode;
}) {
  let [, activeServerId] = useSelectedLayoutSegments();
  let active = activeServerId ? serverId === +activeServerId : href === "/";

  return (
    <Link href={href} className="group relative block">
      <div className="absolute -left-3 flex h-full items-center">
        <div
          className={`${
            active
              ? "h-10"
              : "h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          } w-1 origin-left rounded-r bg-white transition-all duration-200`}
        ></div>
      </div>

      <div className="group-active:translate-y-px">
        <div
          className={`${
            active
              ? "rounded-2xl bg-brand text-white"
              : "rounded-3xl bg-gray-700 text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white"
          } relative flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
