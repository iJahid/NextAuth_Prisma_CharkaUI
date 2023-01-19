import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

import { FormEventHandler, useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const { data: session, status } = useSession();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const empidRef = useRef<HTMLInputElement>(null);
  const pasRef = useRef<HTMLInputElement>(null);
  const [message, setmessage] = useState<any>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      user: empidRef.current?.value,
      username: empidRef.current?.value,
      password: pasRef.current?.value,
      /*callbackUrl: "http://localhost:3000/",*/
    });

    //  console.log(empidRef);
  };

  if (status === "loading") return <p>Loading..</p>;

  return (
    <Flex
      minH={"100vh"}
      alignItems={"center"}
      align={"center"}
      /*      bg={useColorModeValue("gray.50", "gray.800")}*/
      w={"full"}
      h={"100vh"}
      backgroundImage={"url(/images/bg.jpg)"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
      pr={20}
    >
      <Spacer />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="emplid">
                <FormLabel>Employee ID</FormLabel>
                <Input type="text" ref={empidRef} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={pasRef} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
