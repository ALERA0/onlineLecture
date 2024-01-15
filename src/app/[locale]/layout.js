import "../../styles/globals.css";
import { ConfigProvider, Layout } from "antd";

import Providers from "@/redux/Provider";
import { NextIntlClientProvider } from "next-intl";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { notFound } from "next/navigation";

import ClientLayout from "@/components/Layout/ClientLayout";

export default async function RootLayout({ children, params: { locale } }) {
  const locales = ["tr", "en"];

  console.log(locale, "LOKAAAL");

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    if (locale === "tr") {
      messages = (await import(`../../messages/tr.json`)).default;
    } else if (locale === "en") {
      messages = (await import(`../../messages/en.json`)).default;
    }
    console.log("mesage Local", locale);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>Dersigo Kurum</title>
      </head>
      <body suppressHydrationWarning={true}>
        <main>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <StyledComponentsRegistry>
              <Providers>
                <ConfigProvider>
                 <ClientLayout locale={locale} >
                  {children}
                 </ClientLayout>
                </ConfigProvider>
              </Providers>
            </StyledComponentsRegistry>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
