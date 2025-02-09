import { Router } from 'express';
import {authenticated} from "../authentication/middlewares/authenticated.middleware.js";
import {hasRole} from "../authorization/middlewares/has-role.middleware.js";
import {addCurrentUserIdToParams} from "../authentication/middlewares/add-current-user-id-to-params.middleware.js";
import * as usersController from "./users.controller.js";

const router = Router();

router.use(authenticated);
router.get('/me', hasRole('user'), addCurrentUserIdToParams, usersController.findById);
router.get('/', hasRole('admin'), usersController.findAll);
router.get('/:id', hasRole('admin'), usersController.findById);
router.put('/:id', hasRole('admin'), usersController.update);
router.delete('/:id', hasRole('admin'), usersController.remove);

export default router;