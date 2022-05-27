import {
  Box,
  Button,
  Input,
  Stack,
  StackProps,
  Text,
  useNumberInput,
} from "@chakra-ui/react";

import { IProducts } from "../../../interfaces/general";
import { log } from "console";
import { useState } from "react";

// import TesterButton from "../TesterButton";

interface IProps extends StackProps {
  product: IProducts;
  // setColorActive: (color: string) => void;
  // setSizeActive: (size: string) => void;
  handleAddToCart: (
    product: IProducts,
    quantity: number,
    hasTester?: boolean
  ) => void;
}

export default function QuantityButton({
  product,
  handleAddToCart,
  // setColorActive,
  // setSizeActive,
  ...rest
}: IProps) {
  const [quantity, setQuantity] = useState(0);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 1,
      onChange: (value) => setQuantity(Number(value)),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    handleAddToCart(product, quantity);

    //setIsActive(!isActive);
    // if (isActive === false) {
    //   alert("Nenhuma cor foi selecionada!");
    //   // console.log(isActive)
    //   // console.log(handleAddToCart(product, quantity, isActive));
    //   return;
    // } else {
    //   handleAddToCart(product, quantity);
    //   setColorActive("");
    //   setSizeActive("");
    //   setIsActive(false);
    // }
  };

  return (
    <>
      <Stack direction="row" maxW="320px" {...rest}>
        <Button {...dec} size="sm">
          -
        </Button>
        <Input {...input} size="sm" />
        <Button {...inc} size="sm">
          +
        </Button>
      </Stack>

      <Button
        mt={3}
        w="full"
        size="sm"
        disabled={quantity === 0}
        onClick={() => handleButtonClick()}
      >
        Comprar
      </Button>
    </>
  );
}
