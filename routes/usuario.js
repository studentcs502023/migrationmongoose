
import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarioEmail, postUsuario, putUsuario, putUsuarioActivar, putUsuarioInactivar } from "../controllers/usuario.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarEmail, validarExisteUsuario } from "../helpers/usuarios.js";

const router = new Router()

router.get(   "/",getUsuario)

router.get(   "/email"  , [
    check('email').not().isEmpty(),
    check('email',"No es un email valido").isEmail().normalizeEmail(),
    validarCampos
] ,getUsuarioEmail)

router.post("/", [
    check('nombre').not().isEmpty().isLength({min:3,max:50}).trim().escape(),
      check('apellido').not().isAlpha('es-ES', {ignore: ' '}),
    check('edad').isNumeric(),
    check('fechanacimiento',"formato de fecha no valido").isISO8601().isDate(),
    check('fechaCita').isAfter(new Date().toDateString()),
    check('email').isEmail(),    
    check("correo")
      .isEmail()
      .withMessage("Correo no válido")
      .custom(async (correo = "") => {
        const existeEmail = await Usuario.findOne({ correo });
        if (existeEmail) {
          throw new Error(`El correo ${correo} ya está registrado`);
        }
      }),
    validarCampos
  ],postUsuario)

router.put("/:id", [    
    check('nombre').not().isEmpty(),
    check('id').isMongoId(),
    check('id').custom(validarExisteUsuario),
    validarCampos
],putUsuario)

router.put("/activar/:id",putUsuarioActivar)

router.put("/inactivar/:id",putUsuarioInactivar)

router.delete("/:id", deleteUsuario)

export default router