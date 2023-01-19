import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function main(req: NextApiRequest, res: NextApiResponse) {
  const { Where = [] } = req.body;
  const { data = [] } = req.body;
  const { userparms = [] } = req.query;
  const lng = Object.keys(Where).length;
  const lngData = Object.keys(data).length;
  const lngData1 = Object.values(userparms[0]);
  console.log(userparms);
  // lngData1.map((x, y) => console.log(y));
  switch (req.method) {
    case "POST": {
      if (lngData === 0) {
        return res.status(201).json("No DATA");
      }
      if (!data.password) {
        return res.status(201).json("No Password");
      }

      const user = await prisma.user.create({
        data: data,
      });
      res.status(200).json(user);
      break;
    }
    case "PUT": {
      const iData = req.body.data;
      if (iData) {
        const user = await prisma.user.updateMany({
          where: Where,
          data: iData,
        });
        res.status(200).json(user);
      } else {
        console.log("No Data For Update");
        res.status(400).json("No Data For Update");
      }
      break;
    }
    case "GET": {
      try {
        const params = JSON.parse(userparms);
        const WHR = Object.values(params);
        const prm = Object.entries(WHR[0]);
        const jsonObj = JSON.parse(JSON.stringify(WHR[0]));

        const lng1 = prm.length;

        console.log(jsonObj, lng1, WHR[0].id);
        if (lng1 > 0) {
          if (WHR[0].id === -999) {
            const user = await prisma.user.findMany({});
            res.status(200).json(user);
          } else {
            const user1 = await prisma.user.findMany({
              where: jsonObj,
            });
            res.status(200).json(user1);
          }
        } else res.status(200).json("ERRor");
      } catch (err) {
        res.status(400).json("ERR");
        console.log(err);
      }
      break;
    }
    case "DELETE": {
      const user = await prisma.user.deleteMany({
        where: Where,
      });
      res.status(200).json(user);
      break;
    }
    default: {
      res.status(404).json("ERROR");
      break;
    }
  }
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
