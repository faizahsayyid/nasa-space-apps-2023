import React from "react";
import {Container, Box, Heading, Text, Stack, Select, Button} from "@chakra-ui/react";




export const Login = () => {
    return (
        <Container  maxW="100%" padding={0} margin={0}>
          <Box position="relative" width="100%" height="100vh" overflow="hidden" backgroundColor="#000657">
            <Heading position="absolute" fontSize="4xl" top="10%" left="50%" transform="translate(-50%, -50%)" color="white" textAlign="center"> Login, sign up, or continue without account. </Heading>  
            <Text fontSize='3xl' position="absolute" top="18%" left="50%" transform="translate(-50%, -50%)" color="white" textAlign="center">Please answer the following questions:</Text> 

            <form action="submit" style={{ position: "absolute", top: "48%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <Stack spacing={8}>
                    <input type="text" placeholder=" First name" aria-label="First name" style={{ display: "block", marginBottom: "1%" }}/>
                    <input type="text" placeholder=" Last name" aria-label="Last name" style={{ display: "block", marginBottom: "1%" }}/>
                    <input type="text" placeholder=" Email" aria-label="Email" style={{ display: "block", marginBottom: "1%" }}/>
                    <input type="text" placeholder=" LinkedIn" aria-label="LinkedIn" style={{ display: "block", marginBottom: "1%" }}/>
                    <Select placeholder='Select your astrology sign' backgroundColor="white">
                        <option value='Virgo'>Virgo: August 24 - September 23</option>
                        <option value='Libra'>Libra: September 24 - October 23</option>
                        <option value='Scorpio'>Scorpio: October 24 - November 22</option>
                        <option value='Sagittarius'>Sagittarius: November 23 - December 21</option>
                        <option value='Capricorn'>Capricorn: December 22- January 20</option>
                        <option value='Aquarius'>Aquarius: January 21 – February 19</option>
                        <option value='Pisces'>Pisces: February 20 – March 20</option>
                        <option value='Aries'>Aries: March 21- April 20</option>
                        <option value='Taurus'>Taurus: April 21 – May 21</option>
                        <option value='Gemini'>Gemini: May 22 – June 21</option>
                        <option value='Cancer'>Cancer: June 22 – July 23</option>
                        <option value='Leo'>Leo: July 24 – August 23</option>
                    </Select>
                    <Button type="submit">Sign up!</Button>
                </Stack>
            </form>
          </Box>
      </Container>  
    );
  };