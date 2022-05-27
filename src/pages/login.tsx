import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/logo.png";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    const res = await signIn({ email, password });
    setIsLoading(false);
  };

  return (
    <Flex align={"center"} justify={"center"} w="full">
      <Stack spacing={8} mx={"auto"} maxW={"md"} w="full" py={28} px={6}>
        <Stack align={"center"}>
          <Image src={logo.src} alt="Logo Reading.com" width={52} />
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                >
                  Fazer login
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
