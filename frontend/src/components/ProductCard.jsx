import { useProductStore } from '../store/product.js';
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";



const ProductCard = ({product}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updatedProduct, setUpdatedProduct] = useState(product);


    const {deleteProduct, updateProduct }=useProductStore();
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg=useColorModeValue("white","gray.800")

    const toast=useToast()

    const handleDeleteProduct=async (id)=>{
        const {success}=await deleteProduct(id)
        console.log(success);
        
        if(success){
            toast({title: "Product deleted successfully", status:"success", duration:5000})
        }else{
            toast({title: "Failed to delete product", status:"error", duration:5000})
        }
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success } = await updateProduct(pid, updatedProduct);
		console.log("Sucess in updating product: ", success);
		
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: "Some error occurred while updating the product.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};


  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" transition="all 0.3s" _hover={{transform: "translateY(-5px)", shadow: "xl"}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48}    w={'full'} objectFit="cover"/>
        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<MdEdit/>} colorScheme='blue' onClick={onOpen}/>
                <IconButton icon={<MdDelete/>} onClick={()=> handleDeleteProduct(product._id)} colorScheme='red'/>
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
            </Modal>
    </Box>
  )
}

export default ProductCard