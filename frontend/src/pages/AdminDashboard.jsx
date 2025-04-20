import React from "react";
import { Box, Text, VStack, Heading } from "@chakra-ui/react";

export default function AdminDashboard() {
  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="start">
        <Heading size="lg">👋 Welcome, Member</Heading>
        <Text color="gray.600">
          This is your dashboard. Here you can view your current tasks and status.
        </Text>
      </VStack>
    </Box>
  );
}