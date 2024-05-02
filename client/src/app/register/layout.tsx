import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inscription"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
