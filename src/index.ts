import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import { serialize } from "superjson";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ status: "ok" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      take: 2,
      select: {
        id: true,
        email: true,
        name: true,
        health_chats_health_chats_sender_idTousers: {
          select: {
            sender_id: true,
            receiver_id: true,
            type: true,
            conversation_id: true,
            message: true,
          },
        },
      },
    });

    const { json, meta } = serialize(users);

    res.send({ data: json });
  } catch (error) {
    console.log(error);
    res.send({ error: JSON.stringify(error) });
  }
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
