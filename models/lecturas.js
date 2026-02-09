// import mongoose from "mongoose";

// const lectura = new mongoose.Schema({
// userid: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Usuario",
//     required: true
//   },
//     fecha_lectura:{type:Date,default:Date.now},
//     tipo_lectura:{type:String,requireD:true},
//     contenido:{type:String, required:true}
// });

// export default mongoose.model("Lectura",lectura)

import mongoose from "mongoose";

const LecturaSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  tipo: {
    type: String,
    enum: ["principal", "diaria"],
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  fecha_lectura: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Lectura", LecturaSchema);
