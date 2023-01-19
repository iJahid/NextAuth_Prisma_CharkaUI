import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function Users(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return res.status(500).json({ msg: "Bad Request !!! Only Allow POST" });
  }
  const iwhere = req.body;

  const user = await prisma.user.findMany({
    where: iwhere,
  });
  res.status(200).json(user);
}

export default Users;
