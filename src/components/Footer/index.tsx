import { Box, Flex, Image, Text } from "@chakra-ui/react";

import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <Box bg="gray.50" color="gray.700">
      <Box py={8}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: "gray.200",
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: "gray.200",
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Image src={logo.src} alt="Logo Reading.com" width={36} />
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          {`© ${new Date().getFullYear()} Reading.com. Todos os direitos reservados.`}
        </Text>
      </Box>
    </Box>
  );
}
