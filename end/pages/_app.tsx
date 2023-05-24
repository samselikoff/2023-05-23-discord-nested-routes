import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { Discord } from "../components/icons";
import "../globals.css";
import { data } from "@/lib/data";
import Image from "next/image";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  let router = useRouter();
  let [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  if (!router.isReady || isFirstRender) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Discord Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen text-gray-100">
        <div className="hidden space-y-2 overflow-y-scroll bg-gray-900 p-3 md:block">
          <NavLink href="/">
            <Discord className="h-5 w-7" />
          </NavLink>

          <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

          {data.map((server) => (
            <NavLink
              key={server.id}
              href={`/servers/${server.id}/channels/${server.categories[0].channels[0].id}`}
              active={router.query.sid === server.id.toString()}
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

        <Component {...pageProps} />
      </div>
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  let router = useRouter();
  active ||= router.asPath === href;

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
          } flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
