import { Flex, useColorModeValue } from "@chakra-ui/react";

import { AuthContext } from "../../context/AuthContext";
import Footer from "../Footer";
import Header from "../Header";
import React from "react";

const Layout: React.FC = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return (
    <Flex
      flexDir="column"
      minH="100vh"
      justifyContent="space-between"
      bg={!isAuthenticated ? "gray.50" : ""}
    >
      {isAuthenticated && <Header />}
      <Flex as="main">{children}</Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
