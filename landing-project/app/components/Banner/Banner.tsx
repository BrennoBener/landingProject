import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
      <div className={styles.heroImage} role="img" aria-label="Banner da coleção de verão Ponto Igui" />
      <div className={styles.heroWash} />
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>Moda feminina • atacado</p>
        <h1 id="hero-title">A nova estação<br />começa aqui.</h1>
        <p className={styles.heroCopy}>
          Peças pensadas para vitrines que chamam atenção e coleções que giram.
        </p>
        <a className={styles.primaryButton} href="/colecoes">Ver coleção <span aria-hidden="true">↗</span></a>
      </div>
      <p className={styles.heroNote}>Nova coleção verão <span>2026</span></p>
    </section>
  );
}