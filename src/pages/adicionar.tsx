import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import ContainerBoxed from "../components/Container/ContainerBoxed";
import { Divider } from "semantic-ui-react";
import { GetServerSideProps } from "next";
import Search from "../components/Search";
import { createBook } from "../services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

type Inputs = {
  startingReadingDate: string;
  finishedReadingDate: string;
  review: string;
  reviewText: string;
};

export default function Adicionar() {
  const toaster = useToast();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handlerAddBookModal = (data: any) => {
    setSelectedBook(data);
    onOpen();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newBook = {
      title: selectedBook.title,
      subtitle: selectedBook.subtitle || null,
      description: data.reviewText,
      page_count: selectedBook.pageCount,
      image_url: selectedBook.image,
      user_rating: parseInt(data.review),
      starting_read: data.startingReadingDate,
      finished_read: data.finishedReadingDate,
    };
    try {
      const res = await createBook(newBook);
      toaster({
        title: "Sucesso",
        description: "Livro cadastrado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/");
    } catch (err) {
      toaster({
        title: "Erro",
        description: "Ops, houve um erro. Confira os campos e tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ContainerBoxed justifyContent="start">
      <Flex w="full">
        <Flex w={"full"} pl={8} flexDirection="column">
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
              Adicionar Livro
            </Heading>
          </Box>
          <SimpleGrid columns={1} spacing={8}>
            <Search handlerAddBookModal={handlerAddBookModal} />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Adicionar livro</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex w={"full"} flexDir="column">
                    <Flex
                      key={selectedBook?.id}
                      w={"full"}
                      justifyContent={"center"}
                    >
                      <Image
                        src={selectedBook?.image}
                        alt={`${selectedBook?.title}`}
                        borderRadius={6}
                        boxShadow="lg"
                        mb={6}
                      />
                    </Flex>
                    <Flex w="full">
                      <Flex w={"full"}>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          style={{ width: "100%" }}
                        >
                          <Stack dir="column" w={"full"}>
                            <Text fontSize={"lg"} mb={2}>
                              {`${selectedBook?.title}: ${
                                selectedBook?.subtitle || ""
                              }`}
                            </Text>
                            <Text fontWeight="bold">Autores</Text>
                            <Stack direction={"row"} w={"full"} spacing={6}>
                              {selectedBook?.authors &&
                                selectedBook?.authors.map(
                                  (author: string, index: number) => (
                                    <Text
                                      key={index}
                                      fontSize={"sm"}
                                      fontWeight="bold"
                                      color="teal.500"
                                    >
                                      {author}
                                    </Text>
                                  )
                                )}
                            </Stack>

                            <Stack direction={"row"} w={"full"} spacing={6}>
                              <Text fontWeight="bold">Número de páginas</Text>
                              <Text>{selectedBook?.pageCount}</Text>
                            </Stack>

                            <Divider />
                            <Text fontWeight="bold" fontSize="lg">
                              Dados sobre a minha leitura
                            </Text>
                            <FormControl>
                              <FormLabel htmlFor="startingReadingDate">
                                Comecei a ler
                              </FormLabel>
                              <Input
                                type="date"
                                {...register("startingReadingDate", {
                                  required: true,
                                })}
                              />
                              {errors.startingReadingDate && (
                                <Text
                                  my={2}
                                  fontWeight={"bold"}
                                  color="red.600"
                                >
                                  Campo obrigatório
                                </Text>
                              )}
                            </FormControl>
                            <FormControl>
                              <FormLabel htmlFor="finishedReadingDate">
                                Terminei de ler
                              </FormLabel>
                              <Input
                                type="date"
                                {...register("finishedReadingDate")}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel htmlFor="review">
                                Avaliação (1 à 5)
                              </FormLabel>
                              <Input
                                type="number"
                                max="5"
                                min="1"
                                {...register("review")}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel htmlFor="reviewText">
                                Escreva uma resenha
                              </FormLabel>
                              <Textarea {...register("reviewText")} />
                            </FormControl>
                          </Stack>
                          <Button
                            type="submit"
                            colorScheme={"orange"}
                            w="full"
                            my={8}
                          >
                            Adicionar livro
                          </Button>
                        </form>
                      </Flex>
                    </Flex>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
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
        Carregando produtos...
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
