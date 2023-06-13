# 🟢 TODO

- remove hidden md:block

# 🟢 Layout

```tsx
import Image from "next/image";
import { Discord } from "../components/icons";
import "../globals.css";
import { data } from "../lib/data";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen text-gray-100">
          <div className="hidden space-y-2 overflow-y-scroll bg-gray-900 p-3 md:block">
            <NavLink href="/">
              <Discord className="h-5 w-7" />
            </NavLink>

            <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

            {data.map((server) => (
              <NavLink
                href={`/servers/${server.id}/channels/${server.categories[0].channels[0].id}`}
                serverId={server.id}
                key={server.id}
              >
                <Image
                  width={48}
                  height={48}
                  src={`/servers/${server.img}`}
                  alt=""
                />
              </NavLink>
            ))}
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}

function NavLink({
  href,
  serverId,
  children,
}: {
  href: string;
  serverId?: number;
  children: ReactNode;
}) {
  let activeServerId = 1; // ?
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
              ? "bg-brand rounded-2xl text-white"
              : "group-hover:bg-brand rounded-3xl bg-gray-700 text-gray-100 group-hover:rounded-2xl group-hover:text-white"
          } relative flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
```

# 🟢 Page

```tsx
export default function Page() {
  return <p>Hi</p>;
}
```

# 🟢 Rename /pages to /-pages