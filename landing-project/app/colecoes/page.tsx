import Footer from "../components/Footer/Footer";
import Newsletter from "../components/Newsletter/Newsletter";
import ProductCard from "../components/ProductCard/ProductCard";
import { products } from "../data/products";
import styles from "./page.module.css";
import Link from "next/link";

export default function CollectionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Ponto Igui Moda">
          PONTO <span>igui</span>
        </Link>
        <Link className={styles.backLink} href="/">
          Voltar para início <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section className={styles.introduction} aria-labelledby="collections-title">
        <p className={styles.label}>Ponto Igui / Coleções</p>
        <h1 id="collections-title">Peças para uma<br />vitrine com presença.</h1>
        <p className={styles.introCopy}>
          Explore a seleção completa da estação e encontre novidades para o seu negócio.
        </p>
      </section>

      <section className={styles.collection} aria-label="Produtos da coleção">
        {products.map((product) => (
          <ProductCard
            fullSize={false}
            carousel
            detailed
            key={product.reference}
            {...product}
            href={`/produto/${product.id}`}
            image={product.gallery[0]}
            images={product.gallery}
          />
        ))}
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}