import express from "express";
import loggedIn from "../controllers/loggedIn";
import auth from "../middleware/auth";
import redirect from "../controllers/redirect";
import hasRedirected from "../controllers/hasRedirected";

const router = express.Router();

//endpoints
router.get("/", auth, redirect);
router.get("/loggedIn", auth, loggedIn);
router.get("/redirected", hasRedirected);

export default router;
