import express from "express"
import { check } from "express-validator"
import { postpagos, getpagos } from "../controllers/pagos.js"
import  {validarCampos} from "../middlewares/validar-campos.js"

const router = express.Router()

// ✅ CREAR PAGO
router.post(
  "/",
  [
    check("usuario_id").isMongoId(),
    check("monto").isDecimal({ decimal_digits: "0,2" }),
    check("fecha_pago").isISO8601(),
    check("fecha_vencimiento").isISO8601(),
    check("metodo").isIn(["tarjeta", "efectivo", "transferencia"])
  ],
 validarCampos,
  postpagos
)

// ✅ LISTAR PAGOS (por usuario)
router.get(
  "/usuario/:usuario_id",
  [
    check("usuario_id").isMongoId()
  ],
 validarCampos,
  getpagos
)

// ✅ ACTUALIZAR PAGO
// router.put(
//   "/:id",
//   [
//     check("id").isMongoId(),
//     check("monto").optional().isDecimal({ decimal_digits: "0,2" }),
//     check("fecha_pago").optional().isISO8601(),
//     check("fecha_vencimiento").optional().isISO8601(),
//     check("metodo").optional().isIn(["tarjeta", "efectivo", "transferencia"])
//   ],
//  validarCampos,
//   putpagos
// )

export default router
