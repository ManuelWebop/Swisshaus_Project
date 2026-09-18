import { useState } from "react";
import "../register.css";
import RegisterHeader from "../components/RegisterHeader";
import type { DatosIntereses } from "../RegisterTypes";

const nivelesExperiencia = [
  { id: "novato", emoji: "🌱", label: "Primera vez", sub: "Apenas descubro el lugar" },
  {
    id: "intermedio",
    emoji: "🥂",
    label: "Habitual",
    sub: "Vengo seguido",
  },
  { id: "veterano", emoji: "👑", label: "Fiel", sub: "Soy cliente frecuente" },
];

const tiposJuego = [
  { id: "wargames", emoji: "🧀", label: "Fondue" },
  { id: "rol", emoji: "🍖", label: "Raclette" },
  { id: "mesa", emoji: "🥩", label: "Carnes" },
  { id: "pintura", emoji: "🍫", label: "Postres" },
  { id: "tcg", emoji: "🍷", label: "Vinos" },
  { id: "torneos", emoji: "🍇", label: "Maridajes" },
];

const disponibilidad = [
  { id: "lunes-viernes", label: "Lunes a Viernes" },
  { id: "sabados", label: "Sábados" },
  { id: "domingos", label: "Domingos" },
  { id: "tardes", label: "Tardes" },
  { id: "noches", label: "Noches" },
];

interface InteresesProps {
  onSiguiente: (datos: DatosIntereses) => void;
  onAnterior: () => void;
}

function RegisterIntereses({ onSiguiente, onAnterior }: InteresesProps) {
  const [nivel, setNivel] = useState<string>("");
  const [juegos, setJuegos] = useState<string[]>([]);
  const [juegosEspecificos, setJuegosEspecificos] = useState("");
  const [dias, setDias] = useState<string[]>([]);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const toggleJuego = (id: string) => {
    setJuegos((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id],
    );
  };

  const toggleDia = (id: string) => {
    setDias((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const validar = () => {
    const nuevosErrores: Record<string, string> = {};
    if (!nivel) nuevosErrores.nivel = "Selecciona tu frecuencia de visitas";
    if (juegos.length === 0)
      nuevosErrores.juegos = "Selecciona al menos una categoría";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSiguiente = () => {
    if (validar()) onSiguiente({ nivel, juegos, juegosEspecificos, dias });
  };

  return (
    <div className="register-wrapper">
      <div className="base">
        <RegisterHeader faseActual={2} />

        <div className="formulario">
          <div className="datos-personales">
            <h2 className="titulo-datos">Tus Preferencias Gastronómicas</h2>
            <h3 className="subtitulo-datos">
              Ayúdanos a personalizar tu experiencia en SwissHaus
            </h3>

            {/* Frecuencia de visitas */}
            <div className="seccion">
              <label className="campo-label">
                Frecuencia de visitas <span className="requerido">*</span>
              </label>
              <div className="opciones-nivel">
                {nivelesExperiencia.map((n) => (
                  <button
                    key={n.id}
                    className={`opcion-nivel ${nivel === n.id ? "seleccionado" : ""}`}
                    onClick={() => setNivel(n.id)}
                    type="button"
                  >
                    <span className="opcion-emoji">{n.emoji}</span>
                    <span className="opcion-nombre">{n.label}</span>
                    <span className="opcion-sub">{n.sub}</span>
                  </button>
                ))}
              </div>
              {errores.nivel && <span className="error">{errores.nivel}</span>}
            </div>

            {/* Categorías de platos */}
            <div className="seccion">
              <label className="campo-label">
                ¿Qué tipo de platillos disfrutas?{" "}
                <span className="requerido">*</span>
              </label>
              <p className="campo-hint">Selecciona todas las que apliquen</p>
              <div className="opciones-juego">
                {tiposJuego.map((j) => (
                  <label
                    key={j.id}
                    className={`opcion-check ${juegos.includes(j.id) ? "seleccionado" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={juegos.includes(j.id)}
                      onChange={() => toggleJuego(j.id)}
                    />
                    <span>
                      {j.emoji} {j.label}
                    </span>
                  </label>
                ))}
              </div>
              {errores.juegos && (
                <span className="error">{errores.juegos}</span>
              )}
            </div>

            {/* Platillos favoritos */}
            <div className="seccion">
              <label className="campo-label">
                Platillos Favoritos
              </label>
              <p className="campo-hint">
                Opcional – Cuéntanos qué platillos te gustan o quieres probar
              </p>
              <textarea
                className="textarea-juegos"
                placeholder="Ej: Fondue de queso, Cordón Bleu, Raclette..."
                value={juegosEspecificos}
                onChange={(e) => setJuegosEspecificos(e.target.value)}
                rows={3}
              />
            </div>

            {/* Disponibilidad */}
            <div className="seccion">
              <label className="campo-label">Disponibilidad para Eventos</label>
              <p className="campo-hint">¿Cuándo puedes asistir a eventos?</p>
              <div className="opciones-juego">
                {disponibilidad.map((d) => (
                  <label
                    key={d.id}
                    className={`opcion-check ${dias.includes(d.id) ? "seleccionado" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={dias.includes(d.id)}
                      onChange={() => toggleDia(d.id)}
                    />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="botones">
              <button className="regresar" onClick={onAnterior}>
                ← Anterior
              </button>
              <button className="siguiente" onClick={handleSiguiente}>
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterIntereses;
