import styles from "./StoreLocation.module.css";

const mapsUrl = "https://maps.app.goo.gl/s2cNNmEojZUEBCep9";

export default function StoreLocation() {
  return (
    <section className={styles.location} id="localizacao" aria-labelledby="location-title">
      <div>
        <p className={styles.label}>Visite a loja</p>
        <h2 id="location-title">Encontre a Ponto Igui.</h2>
      </div>
      <div className={styles.details}>
        <p>Venha conhecer de perto nossa seleção e conversar com a equipe.</p>
        <a className={styles.link} href={mapsUrl} target="_blank" rel="noreferrer">
          Abrir no Google Maps <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={styles.mapWrapper}>
        <iframe
          title="Localização da Ponto Igui no Google Maps"
          src="https://www.google.com/maps?q=Ponto+Igui&ll=-3.8828212,-38.6208967&z=17&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}