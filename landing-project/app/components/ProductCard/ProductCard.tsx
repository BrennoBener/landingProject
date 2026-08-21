"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../Cart/CartContext";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  category: string;
  description?: string;
  carousel?: boolean;
  detailed?: boolean;
  image: string;
  images?: string[];
  price: number;
  reference?: string;
  title: string;
  fullSize?: boolean;
  href?: string;
  collectionHref?: string;
};

export default function ProductCard({ category, carousel = false, collectionHref, description, detailed, image, images = [image], price, reference, title, fullSize, href }: ProductCardProps) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const visibleImage = images[activeImage] ?? image;

  return (
    <article className={`${styles.card} ${detailed ? styles.detailed : ""}`}>
      {!fullSize && (
        <div className={styles.imageWrapper}>
          {href ? (
            <Link className={styles.imageLink} href={href} aria-label={`Ver detalhes de ${title}`}>
              <Image src={visibleImage} alt={title} width={1200} height={800} />
            </Link>
          ) : (
            <Image src={visibleImage} alt={title} width={1200} height={800} />
          )}
          {carousel && images.length > 1 && (
            <div className={styles.carouselControls}>
              <button type="button" onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} aria-label="Imagem anterior">←</button>
              <span>{activeImage + 1} / {images.length}</span>
              <button type="button" onClick={() => setActiveImage((activeImage + 1) % images.length)} aria-label="Próxima imagem">→</button>
            </div>
          )}
        </div>
      ) || (
          href ? (
            <Link className={styles.imageLink} href={href} aria-label={`Ver detalhes de ${title}`}>
              <Image className={styles.fullSizeImage} src={visibleImage} alt={title} width={1200} height={800} />
            </Link>
          ) : (
            <Image className={styles.fullSizeImage} src={visibleImage} alt={title} width={1200} height={800} />
          )
        )}
      <div className={styles.details}>
        <p>{category}</p>
        {href ? <Link className={styles.titleLink} href={href}><h3>{title}</h3></Link> : <h3>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.purchase}>
          <strong>R$ {price.toFixed(2).replace(".", ",")}</strong>
        </div>
        <div className={styles.purchase}>
          <button
            type="button"
            onClick={() => addItem({ id: reference ?? title, image, price, size: "", title })}
          >
            Adicionar <span aria-hidden="true">+</span>
          </button>
        </div>
        {collectionHref && (
          <Link className={styles.collectionLink} href={collectionHref}>
            Ver coleção <span aria-hidden="true">↗</span>
          </Link>
        )}
        {reference && <span className={styles.reference}>{reference}</span>}
      </div>
    </article>
  );
}