
import express from 'express';
import {login, logout, users, status, refresh} from './routs';
import { withAuthAndRole, withAuth , withCookieAuth } from './middlewares';

let app = express();

app.use("/users",withAuthAndRole(process.env.ADMIN_MARKER), users);
app.use("/login",login);
app.use("/logout",withAuth, logout);
app.use("/status",withAuth, status);
app.use("/refresh",withCookieAuth, refresh);

export default app;
