This is a NextJS App Using NextAuth (Credential Provider) with Prisma Postgre and Chakra UI
1. Install Postgre or use docker (min 9.4+ version)
2. Creadte Payroll db in pulic schema of postgre
3. Install Node, Prisma, Prisma Client and Chakra UI
run :
  a. npm install
  b. yarn add prisma 
     or 
     npm install prisma --save-dev
  c. yarn add @prisma/client
     or
     npm i @prisma/client
  d. yarn add @chakra-ui/css
     or
     npm i @chakra-ui/css
  e. yarn add @chakra-ui/react 
     or
     npm i @chakra-ui/react
     
4. Edit the .env file for postgre credential
5. run : 
    a. prisma init
    b. prisma migrate dev
    



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


