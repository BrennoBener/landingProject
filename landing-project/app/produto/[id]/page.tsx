import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter/Newsletter";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProduct, products } from "../../data/products";
import styles from "./page.module.css";

export function generateStaticParams() {
    return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <Link className={styles.wordmark} href="/" aria-label="Ponto Igui Moda">
                    PONTO <span>igui</span>
                </Link>
                <Link className={styles.backLink} href="/colecoes">Voltar para coleções <span aria-hidden="true">↗</span></Link>
            </header>
            <section className={styles.product} aria-labelledby="product-title">
                <ProductCard {...product} collectionHref="/colecoes" fullSize={true} carousel detailed image={product.gallery[0]} images={product.gallery} />
            </section>
            <Newsletter />
            <Footer />
        </main>
    );
}