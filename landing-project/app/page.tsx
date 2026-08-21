
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Newsletter/Newsletter";
import ProductCard from "./components/ProductCard/ProductCard";
import StoreLocation from "./components/StoreLocation/StoreLocation";
import styles from "./page.module.css";
import { products } from "./data/products";

export default function Home() {
  return (
    <main className={styles.storefront}>
      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#inicio" aria-label="Ponto Igui Moda">
          PONTO <span>igui</span>
        </a>
        <nav className={styles.siteNav} aria-label="Navegação principal">
          <a href="#colecao">Coleção</a>
          <a href="#atacado">Atacado</a>
          <a className={styles.navContact} href="https://wa.me/5585999999999">Fale conosco</a>
        </nav>
      </header>

      <Banner />

      <section className={styles.products} id="colecao" aria-labelledby="products-title">
        <div className={styles.productsHeading}>
          <p className={styles.sectionLabel}>Seleção da estação</p>
          <h2 id="products-title">Peças que fazem<br />a vitrine acontecer.</h2>
        </div>
        <div className={styles.productsGrid}>
          <ProductCard
            href={`/produto/${products[0].id}`}
            category="Essenciais"
            image="/productsImages/modelo1.png"
            price={89.9}
            title="Leveza para todos os dias"
          />
          <ProductCard
            href={`/produto/${products[2].id}`}
            category="Novidades"
            image="/productsImages/modelZara1.jpg"
            price={119.9}
            title="Texturas que destacam"
          />
          <ProductCard
            href={`/produto/${products[4].id}`}
            category="Coleção Zara"
            image="/productsImages/colectionZara2.jpg"
            price={129.9}
            title="Presença em cada detalhe"
          />
        </div>
      </section>

      <section className={styles.collectionStrip} aria-label="Informações da coleção">
        <div>
          <p className={styles.sectionLabel}>Ponto Igui</p>
          <h2>Moda com presença.</h2>
        </div>
        <p className={styles.stripCopy} id="atacado">
          Curadoria feminina para lojistas que procuram novidade, acabamento e alto giro.
        </p>
        <a className={styles.textLink} id="contato" href="https://wa.me/5585998097181" target="_blank" rel="noreferrer">
          Comprar no atacado <span aria-hidden="true">→</span>
        </a>
      </section>

      <StoreLocation />

      <Newsletter />

      <Footer />
    </main>
  );
}
