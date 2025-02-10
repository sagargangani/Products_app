import { useProductStore } from "../store/product.js";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct}=useProductStore();

  const toast=useToast();

  const handleAddProduct=async ()=>{
    // Add new product to the database here
    console.log(newProduct);
    const {success, message}=await createProduct(newProduct);
    console.log(success, message);
    if(success){
        toast({title:message, status:"success", duration:5000});
        setNewProduct({name:"", price:"", image:""});
    }else{
        toast({title:message, status:"error", duration:5000});
    }
    
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} color={useColorModeValue("black","white")}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({...newProduct, price: e.target.value })
              }
              />
              <Input
                placeholder="Product Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                    setNewProduct({...newProduct, image: e.target.value })
              }/>

              <Button onClick={handleAddProduct} w={"full"} colorScheme="blue">
                Add Product
              </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
