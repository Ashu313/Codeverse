import React from "react";
import {
  Flex,
  Box,
  Select,
  Input,
  Button,
  IconButton,
  useBreakpointValue,
  Text,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavBarDrawer } from "../NavBarDrawer";
import { UserProfile } from "../../redux/slice/users/userslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Tooltip,Avatar } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import LoginModal from "../SignIn/SignInModal";
import SignUpModal from "../SignUp/SignUpModal";
import { isAuthenticated } from "../../coreComponents/helper/auth";

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = (type) => {
    if (type === 'signIn') {
      setShowLoginModal(false);
    } else if (type === 'signup') {
      setShowSignUpModal(false);
    }
  };
  const handleShow = (type) => {
    if (type === 'signIn') {
      setShowLoginModal(true);
    } else if (type === 'signup') {
      setShowSignUpModal(true);
    }
  };

  const handleNavbar = () => {
    setShowSidebar(!showSidebar);
  };
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  function signup() {
    navigate("/register");
  }

  function home() {
    navigate("/");
  }
  const dispatch=useDispatch();
  useEffect(()=>{
 dispatch(UserProfile());
  },[dispatch])
  const state=useSelector(state=>state?.users);
  const{Profile,Loading}=state;
  console.log(Profile);


  return (
    <Box>
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={4}
      bg="#f5f5f5"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      position="fixed"
      width="100%"
      zIndex={12}
    >
      <Flex align="center">
        <Box>
          {/* Logo */}
          <Text
            fontSize={30}
            fontWeight="extrabold"
            color="#0056d2"
            onClick={home}
            _hover={{ cursor: "pointer" }}
          >
            Prep&Perform
          </Text>
        </Box>
      </Flex>

      {!isMobile ? (
        <Flex>
          <Box >
            {/* Search Bar */}
            <Input
              type="text"
              variant="filled"
              border="1px solid black"
              fontSize='0.7rem'
              m='0 2rem'
              color="black"
              placeholder="What do you want to learn?"
              borderRadius="10px 0 0px 10px"
              _placeholder={{ color: "#555454",letterSpacing:'1px' }}
            />
          </Box>
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            bg="#0056d2"
            color="white"
            borderRadius="0px 10px 10px 0px"
            _hover={{ background: "#0288D1" }}
          />
        </Flex>
      ) : (
        <Flex align="center">
          <IconButton
            aria-label="Menu"
            icon={<FaBars />}
            bg="transparent"
            color="#0056d2"
            onClick={onOpen}
            fontSize="2xl"
            mr={2}
          />
        </Flex>
      )}

      {isMobile && (
        <IconButton
          aria-label="Search"
          icon={<FaSearch />}
          color="black"
          borderRadius="7px"
          _hover={{ backgroundColor: "#003e9c", color: "white" }}
        />
      )}

      {!isMobile && (
        <Flex align="center">
          {/* Links */}
          <Box mr={4}>
            <Link
              _hover={{ color: "#003e9c", textDecoration: "underline" }}
              href="#"
            >
              Find your New Career
            </Link>
          </Box>
          <Box mr={4}>
            <Link
              _hover={{ color: "#003e9c", textDecoration: "underline" }}
              href="#"
            >
              For Enterprise
            </Link>
          </Box>
          <Box mr={4}>
            <Link
              _hover={{ color: "#003e9c", textDecoration: "underline" }}
              href="#"
            >
              For Universities
            </Link>
          </Box>
          {Profile ? (
            <Tooltip label={Profile?.email} hasArrow fontSize="sm" bg="teal.900">
              <Avatar size="sm" name={Profile?.firstname} src={userInfo?.picture} />
            </Tooltip>
          ) : (
            <>
              <Box mr={4}>
                <Link textDecoration="none" color="#0056d2" href="/login">
                  Login
                </Link>
              </Box>
              <Button
                bg="#0056d2"
                color="white"
                borderRadius="5px"
                _hover={{ bg: "#003e9c" }}
                onClick={() => {
                  handleShow('signup');
                }}
              >
                Join for free
              </Button>
            </>
          )}
        </Flex>
      )}
    </Flex>
    <NavBarDrawer
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    />
  </Box>
  
  );
};

export default Navbar;