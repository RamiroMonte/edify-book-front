import { Box, BoxProps, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";

interface IProps extends BoxProps {
  setTester: (value: boolean) => void;
}

export default function TesterButton({ setTester, ...rest }: IProps) {
  const [value, setValue] = React.useState<string>("no");

  const handleChange = (e: string) => {
    setValue(e);
    setTester(e === "yes");
  };

  return (
    <Box {...rest}>
      <RadioGroup
        defaultValue="2"
        onChange={(e) => handleChange(e)}
        value={value}
      >
        <Stack spacing={5} direction="row">
          <Radio value="no">Não</Radio>
          <Radio value="yes">Sim</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
}
