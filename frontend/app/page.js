export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

async function getProducts() {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) return null;
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/products`, {
      cache: "no-store", signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data.products) ? data.products : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const products = await getProducts();
  return <>
    <div className="announcement">Một chút tinh giản. Một tổ ấm của riêng bạn.</div>
    <header className="header wrap">
      <a className="brand" href="/" aria-label="Hana — Trang chủ">hana<span>®</span></a>
      <nav aria-label="Điều hướng chính"><a href="#products">Bộ sưu tập</a><a href="#about">Về Hana</a></nav>
      <span className="header-note">ĐỒ ĐẸP CHO NHÀ</span>
    </header>
    <main>
      <section className="hero wrap">
        <div className="hero-copy"><p className="eyebrow">THE EVERYDAY COLLECTION / 01</p>
          <h1>Nhà là nơi<br />mình <em>muốn về</em>.</h1>
          <p>Những món đồ giản đơn, sắc màu dịu nhẹ. Thêm một chút cảm hứng cho từng góc nhỏ thân quen.</p>
          <a className="button" href="#products">Khám phá bộ sưu tập <span aria-hidden="true">↗</span></a>
          <p className="hero-caption">NỘI THẤT · ÁNH SÁNG · TRANG TRÍ</p>
        </div>
        <div className="hero-art"><div className="arch" /><img src="/images/chair.svg" alt="Minh họa ghế gỗ trong bộ sưu tập Hana" width="400" height="400" /><span className="art-label">Ít hơn, nhưng đủ đầy.</span><span className="art-number">01 — 06</span></div>
      </section>
      <section className="catalog wrap" id="products">
        <div className="section-heading"><div><p className="eyebrow">CHỌN MỘT CHÚT AN YÊN</p><h2>Cho góc nhà của bạn</h2></div><span>{products ? `${products.length} sản phẩm` : "Bộ sưu tập"}</span></div>
        {products === null ? <div className="notice" role="status">Chưa thể tải bộ sưu tập. Vui lòng thử lại sau.</div> : products.length === 0 ? <p className="notice">Bộ sưu tập đang được cập nhật.</p> : <div className="grid">{products.map(product => <article className="product" key={product.id}>
          <div className={`product-image ${product.color}`}><img src={`/images/${product.icon}.svg`} alt={`Minh họa ${product.name}`} width="320" height="260" loading="lazy" /><span className="product-code">{product.id.toUpperCase()}</span></div>
          <p className="category">{product.category}</p><div className="product-title"><h3>{product.name}</h3><span>{currency.format(product.price)}</span></div><p className="description">{product.description}</p>
        </article>)}</div>}
      </section>
      <section className="about wrap" id="about"><p className="eyebrow">CHUYỆN CỦA HANA</p><h2>Để mỗi ngày về nhà<br />là một niềm vui nhỏ.</h2><p>Hana là cửa hàng nội thất giả lập dành cho bài tập SEO & Deployment. Sản phẩm, giá bán và hình minh họa đều là dữ liệu mẫu; website không nhận đơn hàng.</p></section>
    </main>
    <footer className="wrap"><a className="brand" href="/">hana<span>®</span></a><p>E-commerce demo · SEO & Deployment Assignment</p><a href="#products">Về bộ sưu tập ↑</a></footer>
  </>;
}
