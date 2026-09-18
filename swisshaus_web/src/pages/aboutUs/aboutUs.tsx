import "./aboutUs.css";

function AboutUs() {
  return (
    <div className="ct-page">
      {/* Hero */}
      <section className="ct-hero">
        <span className="ct-hero__badge">📬 Contáctanos</span>
        <h1 className="ct-hero__title">¿Cómo llegar a SwissHaus?</h1>
        <p className="ct-hero__subtitle">
          Estamos en el corazón de Hermosillo, listos para recibirte con la
          mejor cocina suiza y un servicio elegante.
        </p>
      </section>

      {/* Tarjetas de información */}
      <section className="ct-cards" data-testid="contact-cards">
        <div className="ct-card" data-testid="contact-address">
          <span className="ct-card__icon">📍</span>
          <h3 className="ct-card__title">Dirección</h3>
          <p className="ct-card__text">
            Av. Prolongación Paseo del Río 45
            <br />
            83200 Hermosillo, Sonora
          </p>
        </div>

        <div className="ct-card" data-testid="contact-hours">
          <span className="ct-card__icon">🕐</span>
          <h3 className="ct-card__title">Horario</h3>
          <p className="ct-card__text">
            Lun – Vie: 13:00 – 23:00
            <br />
            Sáb: 13:00 – 24:00
            <br />
            Dom: 13:00 – 21:00
          </p>
        </div>

        <div className="ct-card" data-testid="contact-info">
          <span className="ct-card__icon">💌</span>
          <h3 className="ct-card__title">Contacto</h3>
          <p className="ct-card__text">
            contacto@swisshaus.mx
            <br />
            (662) 123-4567
          </p>
        </div>
      </section>

      {/* Reservaciones */}
      <section className="ct-team" data-testid="team-section">
        <h2 className="ct-team__title">Reservaciones</h2>
        <p className="ct-team__subtitle">
          Aceptamos reservas para grupos y eventos especiales.
        </p>
        <p className="ct-team__subtitle">
          Escríbenos a contacto@swisshaus.mx o llámanos para reservar tu mesa.
        </p>
      </section>
    </div>
  );
}

export default AboutUs;