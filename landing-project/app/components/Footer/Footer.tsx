import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={styles.wordmark} href="#inicio" aria-label="Voltar ao início - Ponto Igui Moda">
        PONTO <span>igui</span>
      </a>
      <p>© 2026 Ponto Igui Moda</p>
      <a className={styles.contact} href="https://wa.me/5585999999999">Fale conosco <span aria-hidden="true">↗</span></a>
    </footer>
  );
}