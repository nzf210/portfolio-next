import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { Provider } from "./components/Provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syahril Syamsuddin",
  description: "my portfolio app",
  icons: {
    icon: "/icon.png"
  }
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <Header />
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800`}
      >
        <Provider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;

const Header: React.FC = () => {
  return (
    <Head>
      {typeof metadata.title === 'string' && metadata.title && <title>{metadata.title.toString()}</title>}
      {typeof metadata.title === 'string' && metadata.description && metadata.title && <meta name={metadata.title.toString()} content={metadata.description.toString()} />}
      <link rel="icon" href="/icon.png" />
    </Head>
  );

}