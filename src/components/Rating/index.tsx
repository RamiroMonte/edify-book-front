import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Flex, Stack } from "@chakra-ui/react";

interface Props {
  userRating: number;
}

export default function QuantityButton({ userRating }: Props) {
  return (
    <Stack direction={"row"} spacing={2}>
      {[...Array(5)].map((_, index) =>
        index < userRating ? (
          <AiFillStar key={index} fontSize={30} color="#ECC94B" />
        ) : (
          <AiOutlineStar key={index} fontSize={30} />
        )
      )}
    </Stack>
  );
}
