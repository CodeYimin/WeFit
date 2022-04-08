import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
import { COOKIE_NAME } from "./consts";
import { Context } from "./context";
import { db } from "./db";
import { schema } from "./schema";

async function start() {
  const PORT = process.env.PORT || 4000;

  const app = express();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({ req, res, db }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
  await apolloServer.start();

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    session({
      name: COOKIE_NAME,
      secret: "aosenuth",
      resave: false,
      saveUninitialized: false,
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

start();
