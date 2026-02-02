import { Router } from "express"
import { check } from "express-validator"
import { postlecturas, getlecturas, deletelecturas } from "../controllers/lecturas.controller.js"
import validarResults from "../middlewares/validarResults.js"

const router = Router()

// ✅ CREAR LECTURA
router.post(
  "/",
  [
    check("userid")
      .not().isEmpty()
      .isMongoId(),

    check("tipo_lectura")
      .not().isEmpty()
      .isString(),

    check("contenido")
      .not().isEmpty()
      .isString()
  ],
  validarResults,
  postlecturas
)

// ✅ LISTAR LECTURAS POR USUARIO
router.get(
  "/usuario/:userid",
  [
    check("userid").isMongoId()
  ],
  validarResults,
  getlecturas
)

// ✅ ELIMINAR LECTURA
router.delete(
  "/:id",
  [
    check("id").isMongoId()
  ],
  validarResults,
  deletelecturas
)

export default router
