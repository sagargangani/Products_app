import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Container maxW={"1140px"} px={4} pt={4}>
      <Flex
        h={"16"}
        alignContent={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l,rgb(7, 112, 249),rgb(100, 136, 226))"
          bgClip="text"
          fontSize="3xl"
          fontWeight="extrabold"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          onClick={() => navigate("/")}
        >
          PRODUCT STORE 📦
        </Text>
        <HStack alignContent={"center"} spacing={2}>
          <Link to={"/create"}>
            <Button>
              <FaPlusSquare />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <FaSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
