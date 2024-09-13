import { Text, Box, Image, Button, VStack } from "@chakra-ui/react"
import { useConnectModal } from "@rainbow-me/rainbowkit"

import config from "../../public/data/config.json"

export default function ConnectWalletButton() {
    const { openConnectModal } = useConnectModal()

    return (
        <Box position="relative" maxW={"500px"} w={"100%"} minH={{ base: "200px", sm: "500px" }}>
            <Image src={config.nftIpfsUrl} alt="Unminted NFT Image" borderRadius={"20px"} filter="grayscale(100%) brightness(50%)" />
            <Button
                position="absolute"
                top="40%"
                left="50%"
                transform="translate(-50%, -50%)"
                py={{ base: 10, sm: 3 }}
                px={8}
                variant="ConnectWalletButton"
                fontSize="2xl"
                borderRadius="full"
                minW="200px"
                w="65%"
                h={"fit-content"}
                whiteSpace="normal"
                textAlign="center"
                onClick={openConnectModal}
                fontWeight={"extrabold"}
            >
                <VStack gap={1}>
                    <Text>Connect wallet</Text>
                    <Text>↓</Text>
                    <Text>Mint Settlement NFT</Text>
                </VStack>
            </Button>
        </Box>
    )
}
