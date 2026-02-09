import express from "express";
import { check } from "express-validator";
import { postLectura } from "../controllers/lecturas.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = express.Router();

router.post(
  "/",
  [
    check("usuario_id", "ID inválido").isMongoId(),
    check("tipo").isIn(["principal", "diaria"])
  ],
  validarCampos,
  postLectura
);


export default router;


// router.post(
//   "/",
//   [
//     check("userid")
//       .not().isEmpty()
//       .isMongoId(),

//     check("tipo_lectura")
//       .not().isEmpty()
//       .isString(),

//     check("contenido")
//       .not().isEmpty()
//       .isString()
//   ],
//   validarResults,
//   postlecturas
// )

// ✅ LISTAR LECTURAS POR USUARIO
// router.get(
//   "/usuario/:userid",
//   [
//     check("userid").isMongoId()
//   ],
//   validarResults,
//   getlecturas
// )

// ✅ ELIMINAR LECTURA
// router.delete(
//   "/:id",
//   [
//     check("id").isMongoId()
//   ],
//   validarResults,
//   deletelecturas
// )

