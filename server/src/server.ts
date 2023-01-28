import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);
const port = process.env.PORT || 3333;

const start = async () => {
  try {
    const url = await app.listen({ port: port, host: "0.0.0.0" });
    console.log(`Server running on ${url}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
