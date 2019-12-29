
import express from 'express';
import {login, logout, users, dashboard, refresh, profile} from './routs';
import { withAuthAndRole, withAuth , withCookieAuth } from './middlewares';


let app = express();

app.use("/users",withAuthAndRole(process.env.ADMIN_MARKER), users);
app.use("/login",login);
app.use("/logout",withAuth, logout);
app.use("/profile", withAuth, profile)
app.use("/dashboard",withAuth, dashboard);
app.use("/refresh",withCookieAuth, refresh);

export default app;
