import { Flex, Icon, Image, Link, Stack, StackDivider } from "@chakra-ui/react";

import { AuthContext } from "../../context/AuthContext";
import ContainerBoxed from "../Container/ContainerBoxed";
import { FiLogOut } from "react-icons/fi";
import NextLink from "next/link";
import logo from "../../assets/images/logo.png";
import { useContext } from "react";

export default function Header() {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => signOut();

  return (
    <Flex as="header" flexDir="column">
      <ContainerBoxed justifyContent="space-between" alignItems="center">
        <Image src={logo.src} alt="Logo Reading.com" width={36} />
        <Stack direction={["row"]} spacing={4} divider={<StackDivider />}>
          <Link
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "none" }}
            onClick={handleSignOut}
          >
            Sair
            <Icon as={FiLogOut} ml={2} />
          </Link>
        </Stack>
      </ContainerBoxed>
      <ContainerBoxed fullBg="background.500" py={3}>
        <Stack direction="row" spacing={8} w="full" color="white">
          <NextLink href="/" passHref>
            <Link
              fontWeight="bold"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Meus Livros
            </Link>
          </NextLink>
          <NextLink href="/adicionar" passHref>
            <Link
              fontWeight="bold"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Adicionar livro
            </Link>
          </NextLink>
        </Stack>
      </ContainerBoxed>
    </Flex>
  );
}
