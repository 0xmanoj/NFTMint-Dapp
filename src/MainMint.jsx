import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Link, Spacer, Text } from "@chakra-ui/react";
import roboatNft from "./RoboatNft.json";

const roboatNftAddress = "0x7EA81F97F5C4D140E2822deA43527cb3FAa30471";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboatNftAddress,
                roboatNft.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.02*mintAmount).toString()),
                });
                console.log("response: ", response);
            } catch (err) {
                console.log("error :", err)
            }
        }
    }
    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };
    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };
    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000" fontFamily="VT323">RobotNft</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        textShadow="0 2px 2px #000000"
                        fontFamily="VT323"
                    >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia dolores nisi natus, pariatur, amet sunt.
                    </Text>

                </div>
                {
                    isConnected ? (
                        <div>
                            <Flex align="center" justify="center">
                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleDecrement}
                                >
                                    -
                                </Button>
                                <Input
                                    readOnly
                                    fontFamily="inherit"
                                    width="100px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="14px"
                                    type="number"
                                    value={mintAmount}
                                />
                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleIncrement}
                                >
                                    +
                                </Button>
                            </Flex>
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleMint}
                            >
                                Mint
                            </Button>
                        </div>
                    ) : (
                        <Text
                            marginTop="70px"
                            fontSize="30px"
                            letterSpacing="-5.5%"
                            fontFamily="VT323"
                            textShadow="0 3px #000000"
                            color="#D6517D"
                        >
                            You Must be connect to mint
                        </Text>
                    )
                }
            </Box>
        </Flex>
    )
}

export default MainMint;
