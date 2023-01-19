import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Heading,
  GridItem,
  Grid,
} from "@chakra-ui/react";

function Users({ data }) {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          <Heading width={"100vh"} mb={12}>
            User List
          </Heading>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <Flex height={"100vh"} justifyContent={"center"}>
            <Flex direction={"column"} p={12} rounded={6} position={"relative"}>
              <TableContainer>
                <Table variant="striped">
                  <TableCaption>User List</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Password</Th>
                      <Th>email</Th>
                      <Th>Role</Th>
                      <Th>Created</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((d) => (
                      <Tr>
                        <Td>{d.id}</Td>
                        <Td>{d.username}</Td>
                        <Td>{d.password}</Td>
                        <Td>{d.email}</Td>
                        <Td>{d.role}</Td>
                        <Td>{d.createdate}</Td>
                      </Tr>
                    ))}
                    <Tr></Tr>
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const sData = JSON.stringify({
    Where: {
      id: -999,
    },
    data: {
      username: "2545",
      asdasd: "254",
    },
  });

  /* const res = await fetch("http://localhost:3000/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
    // body: '{\n"Where":{"id":1},\n"data":{"username":"2545","asdasd":"254"}\n\n}',
    body: JSON.stringify({
      Where: {
        id: 1,
      },
      data: {
        username: "2545",
        asdasd: "254",
      },
    }),
  });*/
  const res = await fetch(`http://localhost:3000/api/users/${sData}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
/*const Users = async ({ userList }) => (
  <div>
    {userList.data.map((x, i) => (
      <div>{x.title}</div>
    ))}
    <>
      <table></table>
    </>
  </div>
);
/*
Users.getInitialProps = async () => {
  await axios
    .get(`http://localhost:3000/api/users/`)
    .then((response) => {
      const data = response;
      return { props: { data } };
    })
    .catch((error) => {
      console.log(error);
      const data = "np da";
      return { props: data };
    });
};*/

export default Users;
