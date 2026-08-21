import styles from "./Newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <div className={styles.introduction}>
        <p className={styles.label}>Fique por dentro</p>
        <h2 id="newsletter-title">Novidades que chegam primeiro até você.</h2>
      </div>
      <form className={styles.form}>
        <label htmlFor="newsletter-email">E-mail</label>
        <input id="newsletter-email" name="email" type="email" placeholder="seu@email.com" required />
        <label htmlFor="newsletter-phone">Telefone</label>
        <input id="newsletter-phone" name="phone" type="tel" placeholder="(00) 00000-0000" required />
        <button type="submit">Quero receber <span aria-hidden="true">↗</span></button>
      </form>
    </section>
  );
}