import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { getAllBooks, removeBook } from "../services/api";

import ContainerBoxed from "../components/Container/ContainerBoxed";
import { FaTrash } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { IBooks } from "../interfaces/general";
import NextLink from "next/link";
import Rating from "../components/Rating";
import coverDefault from "../assets/images/cover-default.png";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Dashboard() {
  const [removedId, setRemovedId] = useState<number | null>(null);
  const toaster = useToast();
  const { data, isError, isLoading } = useQuery<IBooks[]>(
    ["books", { removedId }],
    getAllBooks
  );

  const handlerRemoveBook = async (id: string) => {
    try {
      const res = await removeBook(id);
      toaster({
        title: "Sucesso",
        description: "Livro removido com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setRemovedId(parseInt(id));
    } catch (err) {
      toaster({
        title: "Erro",
        description: "Ops, houve um erro. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setRemovedId(parseInt(id));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <ContainerBoxed justifyContent="start">
      <Flex w="full">
        <Flex w={"full"} maxW="300px">
          <NextLink href="/adicionar">
            <Button
              borderRadius={"full"}
              bgColor="orange.400"
              color="white"
              w={"full"}
              _hover={{ bg: "orange.500" }}
            >
              Adicionar livro
            </Button>
          </NextLink>
        </Flex>
        <Flex flex={1} pl={8} flexDirection="column">
          <Box w={"full"} borderBottom="1px solid" borderColor={"teal"} mb={6}>
            <Heading
              as="h2"
              size="md"
              color={"teal"}
              display="inline-block"
              py={2}
              ml={6}
              borderBottom="1px solid"
              borderColor={"teal"}
            >
              Lendo Atualmente
            </Heading>
          </Box>
          <SimpleGrid columns={1} spacing={8}>
            {data &&
              data.map((book) => (
                <Flex key={book.id} w={"full"}>
                  <Flex
                    key={book.id}
                    w={"full"}
                    maxW="200px"
                    justifyContent={"center"}
                  >
                    <Image
                      src={book.image_url || coverDefault.src}
                      alt={`${book.title} ${book.subtitle}`}
                      borderRadius={6}
                      boxShadow="lg"
                    />
                  </Flex>
                  <Flex flex={1}>
                    <Stack dir="column" w={"full"}>
                      <Text fontSize={"lg"} mb={2}>
                        {`${book.title}: ${book.subtitle}`}
                      </Text>
                      <Stack direction={"row"} w={"full"} spacing={6}>
                        {book.Author &&
                          book.Author.map((author) => (
                            <Text
                              key={author.id}
                              fontSize={"sm"}
                              fontWeight="bold"
                              color="teal.500"
                            >
                              {author.name}
                            </Text>
                          ))}
                      </Stack>
                      {book.user_rating && (
                        <Rating userRating={book.user_rating} />
                      )}
                      {book.starting_read && (
                        <Stack direction={"row"} w={"full"}>
                          <Text fontSize={"sm"} color="teal.500">
                            Você começou a ler em
                          </Text>
                          <Text
                            fontSize={"sm"}
                            color="teal.500"
                            fontWeight="bold"
                          >
                            {new Date(book.starting_read).toLocaleDateString()}
                          </Text>
                        </Stack>
                      )}
                      {book.finished_read && (
                        <Stack direction={"row"} w={"full"}>
                          <Text fontSize={"sm"} color="teal.500">
                            Você terminou de ler em
                          </Text>
                          <Text
                            fontSize={"sm"}
                            color="teal.500"
                            fontWeight="bold"
                          >
                            {new Date(book.finished_read).toLocaleDateString()}
                          </Text>
                        </Stack>
                      )}
                    </Stack>
                    <Button
                      variant="outline"
                      colorScheme={"red"}
                      leftIcon={<FaTrash />}
                      onClick={() => handlerRemoveBook(book.id)}
                    >
                      Remover
                    </Button>
                  </Flex>
                </Flex>
              ))}
            {data?.length === 0 && (
              <Text>
                Você não está lendo nenhum livro nomomento. Adicione um no botão
                ao lado :)
              </Text>
            )}
          </SimpleGrid>
        </Flex>
      </Flex>
    </ContainerBoxed>
  );
}

const Loader = () => (
  <ContainerBoxed justifyContent="center">
    <Box textAlign="center" py={10} px={6}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="background.500"
        size="xl"
      />
      <Heading as="h2" size="lg" color="black.500" mt={6} mb={2}>
        Carregando livros...
      </Heading>
    </Box>
  </ContainerBoxed>
);

const Error = () => (
  <ContainerBoxed justifyContent="center">
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="lg" color="red.500" mt={6} mb={2}>
        Erro ao carregar livros
      </Heading>
    </Box>
  </ContainerBoxed>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["edify-books.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
