import axios from "axios";
import Lectura from "../models/lecturas.js";
import Usuario from "../models/usuario.js";
import Pagos from "../models/modelspagos.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const postLectura = async (req, res) => {
  try {
    const { usuario_id, tipo } = req.body;

    /* 1️⃣ Validar usuario */
    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    /* 2️⃣ Validar suscripción vigente */
    const hoy = new Date();

    const pagoVigente = await Pagos.findOne({
      usuario_id,
      fecha_vencimiento: { $gte: hoy }
    });

    if (!pagoVigente) {
      return res.status(403).json({
        msg: "Suscripción vencida o inexistente"
      });
    }

    /* 3️⃣ Crear prompt */
    const prompt = `
Genera una lectura numerológica ${tipo}.
Fecha de nacimiento del usuario: ${usuario.fechanacimiento}.
Lenguaje espiritual, claro y positivo.
No menciones dinero, pagos ni suscripciones.
    `;

    /* 4️⃣ Llamada a Gemini 3 (AXIOS) */
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const contenido =
      response.data.candidates[0].content.parts[0].text;

    /* 5️⃣ Guardar lectura */
    const lectura = await Lectura.create({
      usuario_id,
      tipo,
      contenido
    });

    /* 6️⃣ Respuesta */
    res.status(201).json({
      msg: "Lectura generada correctamente",
      lectura
    });

  } catch (error) {
    console.error(
      "Error Gemini:",
      error.response?.data || error.message
    );
    res.status(500).json({
      msg: "Error al generar la lectura"
    });
  }
};
