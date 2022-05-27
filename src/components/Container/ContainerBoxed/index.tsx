import React from "react";
import { BackgroundProps, Flex, FlexProps } from "@chakra-ui/react";

interface ContainerBoxedProps extends FlexProps {
  fullBg?: BackgroundProps["bg"];
}

const ContainerBoxed: React.FC<ContainerBoxedProps> = ({
  children,
  fullBg,
  ...rest
}) => {
  return (
    <Flex w="full" justifyContent="center" bg={fullBg}>
      <Flex w="full" maxW="container.lg" py={10} px={4} {...rest}>
        {children}
      </Flex>
    </Flex>
  );
};

export default ContainerBoxed;
