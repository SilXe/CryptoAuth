import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Divider,
  VStack,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from '../contexts/AuthContext';

export default function MemberDashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  const shortenAddress = (address) => {
    if (!address) return "Loading...";
    return `${address.slice(0, 8)}...${address.slice(-4)}`;
  };

  const tasks = [
    { id: 1, name: "Task 1", due: "2025-05-01", color: "purple.400" },
    { id: 2, name: "Task 2", due: "2025-05-05", color: "green.400" },
    { id: 3, name: "Task 3", due: "2025-05-10", color: "red.300" },
    { id: 4, name: "Task 4", due: "2025-05-15", color: "gray.700" },
  ];


  return (
    <Box p={4} maxW="500px" mx="auto" bg="gray.50" minH="100vh">
      {/* Top Navigation */}
      <Flex justify="space-between" align="center" mb={4}>
        <IconButton
          icon={<FiUser />}
          aria-label="Profile"
          variant="ghost"
          onClick={() => navigate("/profile")}
        />
        <Text
          fontSize="2xl"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          CryptoAuth
        </Text>
        <IconButton
          icon={<FiLogOut />}
          aria-label="Logout"
          variant="ghost"
          onClick={handleLogout}
        />
      </Flex>

      <Divider mb={4} />

    <Text fontSize="md" color="gray.700" mb={4}>
        Wallet Address: <b>{shortenAddress(user?.walletAddress)}</b>
    </Text>

    <Box
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        p={4}
        mb={6}
        textAlign="center"
        >
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Your Current Status
        </Text>

        <VStack spacing={2}>
            <Box
            bg="gray.200"
            w="100px"
            h="100px"
            borderRadius="md"
            mx="auto"
            /> {/* NFT image placeholder */}

            <Text fontSize="xl" fontWeight="bold">
            Member
            </Text>
        </VStack>
    </Box>

    <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Your Tasks
        </Text>

        <VStack spacing={3} align="stretch">
            {tasks.map((task) => (
            <Flex
                key={task.id}
                p={3}
                bg="blue.100"
                borderRadius="md"
                align="center"
                justify="space-between"
            >
                <Flex align="center" gap={3}>
                <Box w="20px" h="20px" bg={task.color} borderRadius="sm" />
                <Text>{task.name}</Text>
                </Flex>
                <Text color="gray.600" fontSize="sm" fontWeight="semibold">
                {task.due}
                </Text>
            </Flex>
            ))}
        </VStack>
    </Box>

    </Box>
  );
}