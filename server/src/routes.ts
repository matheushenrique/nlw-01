import express from "express";
import { celebrate, Joi } from "celebrate";
import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);
routes.post(
  "/points",
  upload.single("image"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    }),
    },{
        abortEarly: false
    }),
  pointsController.create
);



export default routes;

// app.get("/users", (request, response) => {
//   const search = String(request.query.search);
//   const filteredUsers = search
//     ? users.filter((user) => user.includes(search))
//     : users;

//   return response.json(filteredUsers);
// });

// app.get("/users/:id", (request, response) => {
//   const id = Number(request.params.id);

//   return;
// });

// app.post("/users", (request, response) => {
//   const data = request.body;

//   const user = {
//     name: data.name,
//     email: data.email,
//   };

//   return response.json(user);
// });