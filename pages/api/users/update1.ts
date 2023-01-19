import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function main(req: NextApiRequest, res: NextApiResponse) {



  
  if (req.method != "POST") {
    return res.status(500).json({ msg: "Bad Request !!! Only Allow POST" });
  }
  const iwhere = req.body.where;
  const iData = req.body.data;

  const user = await prisma.user.UpdateMany({
    where: iwhere,
    data: iData,
  });
  res.status(200).json(user);
}

export default main;
