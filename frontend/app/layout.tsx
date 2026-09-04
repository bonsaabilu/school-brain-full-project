import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "School Brain - Modern Education Management",
  description: "A beautiful, intelligent platform for managing schools, students, teachers, and attendance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }} />
        {children}
      </body>
    </html>
  );
}
