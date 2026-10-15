import "@fontsource/noto-serif/400.css";
import "@fontsource/noto-serif/400-italic.css";
import "./globals.css";

const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const title = "Hana — Nội thất, đèn bàn & đồ trang trí tối giản cho tổ ấm";
const description =
  "Hana là cửa hàng nội thất phong cách tối giản: đèn bàn, ghế gỗ, bình gốm với sắc màu dịu nhẹ, giúp mỗi góc nhà thêm yên và ấm áp.";
const shareImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Hana — Nhà là nơi mình muốn về"
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Hana",
  keywords: ["Hana", "nội thất", "đèn bàn", "ghế gỗ", "bình gốm", "trang trí nhà"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Hana",
    url: siteUrl,
    title,
    description,
    images: [shareImage]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage.url]
  }
};

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
