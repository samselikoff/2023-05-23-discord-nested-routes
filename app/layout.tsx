import "../globals.css";
import ServerNav from "./server-nav";

export const metadata = {
  title: "Discord Clone",
  description: "From Build UI's Tailwind Mastery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen text-gray-100">
          <ServerNav />

          {children}
        </div>
      </body>
    </html>
  );
}
