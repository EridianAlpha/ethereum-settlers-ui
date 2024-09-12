import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { VStack, HStack, Text, Box, Link } from "@chakra-ui/react"
import NextLink from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function MVP() {
    const [tokenData, setTokenData] = useState(null)
    const [svgContent, setSvgContent] = useState("")
    const [isViewNftMetadataExpanded, setIsViewNftMetadataExpanded] = useState(false)

    const getFormattedDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-based, so +1
        const day = String(date.getDate()).padStart(2, "0")

        return `${year}-${month}-${day}`
    }

    useEffect(() => {
        const fetchTokenURI = async () => {
            // Define the provider and contract details
            const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
            const contractAddress = "0xc5a5C42992dECbae36851359345FE25997F5C42d"

            // Contract ABI with only the tokenURI function
            const abi = ["function tokenURI(uint256 tokenId) view returns (string)"]

            // Create a contract instance
            const contract = new ethers.Contract(contractAddress, abi, provider)

            try {
                // TODO: Currently hardcoded to tokenId 1, but this should be dynamic based on user input and/or connected wallet
                const uri = await contract.tokenURI(1)

                // Remove the 'data:application/json;base64,' part from the uri and decode the base64 string
                const base64Data = uri.replace("data:application/json;base64,", "")

                // Decode base64 and parse JSON
                const jsonData = JSON.parse(atob(base64Data))

                // Set the token data to display in the UI
                setTokenData(jsonData)

                // Check if jsonData.image contains an IPFS URL and replace it in the SVG
                if (jsonData.imageCompositeSvg) {
                    // Remove the base64 prefix for the SVG data (data:image/svg+xml;base64,)
                    const encodedSvg = jsonData.imageCompositeSvg.replace("data:image/svg+xml;base64,", "")

                    // Decode base64 to plain SVG string
                    const decodedSvg = atob(encodedSvg)

                    // Replace ipfs:// with a public IPFS gateway inside the SVG
                    const modifiedSvg = decodedSvg.replace(/ipfs:\/\//g, "https://ipfs.io/ipfs/")

                    // Re-encode the modified SVG to base64
                    const reEncodedSvg = btoa(modifiedSvg)

                    // Set the SVG content to the modified SVG
                    setSvgContent(`data:image/svg+xml;base64,${reEncodedSvg}`)
                }
            } catch (error) {
                console.error("Error fetching tokenURI:", error)
            }
        }

        fetchTokenURI()
    }, [])

    if (tokenData)
        return (
            <VStack w={"100%"} maxW={"90%"} alignItems={"center"} pb={5} px={3} gap={0}>
                <VStack
                    w={"100%"}
                    maxW={"400px"}
                    gap={0}
                    className={"bgContent"}
                    borderTopRadius={25}
                    borderBottomRadius={isViewNftMetadataExpanded ? 0 : 25}
                    overflow={"hidden"}
                >
                    <Box w={"100%"} borderRadius={25} overflow={"hidden"}>
                        {svgContent && <embed src={svgContent} />}
                    </Box>
                    <HStack
                        justifyContent={"center"}
                        w={"100%"}
                        cursor={"pointer"}
                        onClick={() => setIsViewNftMetadataExpanded(!isViewNftMetadataExpanded)}
                        className={"bgContent"}
                        gap={5}
                        pt={3}
                        pb={isViewNftMetadataExpanded ? 1 : 3}
                    >
                        <Box
                            boxSize={6}
                            as={FontAwesomeIcon}
                            icon={faChevronRight}
                            transition="all 0.2s"
                            transform={`rotate(${isViewNftMetadataExpanded ? 45 : 0}deg)`}
                            borderRadius={"full"}
                        />
                        <Text fontWeight={"bold"}>NFT Metadata</Text>
                        <Box
                            boxSize={6}
                            as={FontAwesomeIcon}
                            icon={faChevronRight}
                            transition="all 0.2s"
                            transform={`rotate(${isViewNftMetadataExpanded ? 135 : 180}deg)`}
                            borderRadius={"full"}
                        />
                    </HStack>
                </VStack>
                {isViewNftMetadataExpanded && (
                    <VStack
                        gap={5}
                        pt={3}
                        pb={6}
                        px={8}
                        maxW={"100%"}
                        borderBottomRadius={{ base: 20, md: 70, xl: 80 }}
                        borderTopRadius={{ sm: 0, md: 120, lg: 220, xl: 270 }}
                        alignItems={"center"}
                        className={"bgContent"}
                    >
                        <VStack gap={0}>
                            <Text fontWeight={"bold"}>Name</Text>
                            <Text textAlign={"center"}>{tokenData.name}</Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontWeight={"bold"}>Description</Text>
                            <Text textAlign={"center"}>{tokenData.description}</Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontWeight={"bold"}>Mint Timestamp</Text>
                            <Text textAlign={"center"}>{tokenData.attributes.find((attr) => attr.trait_type === "Mint Timestamp")?.value}</Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontWeight={"bold"}>Current Owner</Text>
                            <Text textAlign={"center"}>0x000...</Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontWeight={"bold"}>Background Image</Text>
                            <Text wordBreak="break-all" whiteSpace="normal" textAlign={"center"}>
                                <Link
                                    as={NextLink}
                                    href={tokenData.image.replace(/ipfs:\/\//g, "https://ipfs.io/ipfs/")}
                                    color={"blue"}
                                    target="_blank"
                                >
                                    {tokenData.image}
                                </Link>
                            </Text>
                        </VStack>
                        <VStack gap={0}>
                            <Text fontWeight={"bold"}>Composite SVG Image</Text>
                            <Text wordBreak="break-all" whiteSpace="normal" textAlign={"center"}>
                                {/* <Link as={NextLink} href={svgContent} color={"blue"} target="_blank">
                                    {svgContent}
                                </Link> */}
                                <Link
                                    as="a"
                                    href={svgContent}
                                    color={"blue"}
                                    download={`${tokenData.name} ${getFormattedDate()}.svg`} // This ensures it suggests a download, but the image may still load in a new tab
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {svgContent}
                                </Link>
                            </Text>
                        </VStack>
                    </VStack>
                )}
            </VStack>
        )

    return <Text>Fetching token data...</Text>
}
