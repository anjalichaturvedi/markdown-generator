// ToggleButton.js
import { useState } from 'react';
import { ChakraProvider, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const handleToggle = () => {
    toggleColorMode();
  };

  return (
    <Flex align="center" justify="flex-end" p={4}>
      <IconButton
        icon={isDark ? <FaSun /> : <FaMoon />}
        onClick={handleToggle}
        colorScheme="teal"
        variant="outline"
        aria-label={`Toggle ${isDark ? 'Light' : 'Dark'} Mode`}
      />
    </Flex>
  );
};

export default ToggleButton;
