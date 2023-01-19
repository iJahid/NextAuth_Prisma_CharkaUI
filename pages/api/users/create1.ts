import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

async function main(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return res.status(500).json({ msg: "Bad Request !!! Only Allow POST" });
  }
  if (!req.body) {
    return res.status(500).json({ msg: "No  User Info" });
  }
  const user = await prisma.user.create({
    data: req.body,
  });
  res.status(200).json(user);
}

export default main;
/*.then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });*/
