import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Input,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ColorModeScript,
  useToast,
  Heading,
  ColorModeProvider,
  useColorMode,
  CSSReset,
  IconButton,
} from '@chakra-ui/react';
import './App.css';
import ToggleButton from './ToggleButton';
import { FaMoon, FaSun } from 'react-icons/fa'; // Icons for dark and light modes

function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableData, setTableData] = useState(createEmptyTableData(rows, cols));
  const [markdownOutput, setMarkdownOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  
  function createEmptyTableData(rows, cols) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));
  }

  function createTable() {
    setTableData(createEmptyTableData(rows, cols));
  }

  function updateCell(row, col, value) {
    const newTableData = [...tableData];
    newTableData[row][col] = value;
    setTableData(newTableData);
  }

  function generateMarkdown() {
    setIsLoading(true); // Set loading to true before starting the operation

    setTimeout(() => {
      const markdown = tableData.map(row => `| ${row.join(' | ')} |`).join('\n');
      setMarkdownOutput(markdown);
      setIsLoading(false); // Set loading to false when the operation is complete
      showToast('Markdown Generated', 'success');
    }, 1000); // Simulating an asynchronous operation, replace with your actual logic
  }

  const toast = useToast();

  function copyToClipboard() {
    navigator.clipboard.writeText(markdownOutput)
      .then(() => {
        showToast('Copied to Clipboard', 'success');
      })
      .catch((error) => {
        console.error('Unable to copy to clipboard', error);
        showToast('Error', 'error');
      });
  }

  function showToast(title, status) {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  function resetData() {
    setRows(3);
    setCols(3);
    setTableData(createEmptyTableData(3, 3));
    setMarkdownOutput('');
  }


  return (
    <ChakraProvider>
      <ToggleButton />
        <Box textAlign="center" margin="20px">
        <Heading as="h1" size="xl" mb="4">Markdown Table Generator</Heading>
          <label>
            Rows:
            <Input type="number" min="1" value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10))} />
          </label>
          <label>
            Columns:
            <Input type="number" min="1" value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10))} />
          </label>
          <Button onClick={createTable}>Create Table</Button>

          <Box id="table-container" margin="20px auto">
            <Table>
              <Thead>
                <Tr>
                  {Array.from({ length: cols }, (_, colIndex) => (
                    <Th key={colIndex}>Column {colIndex + 1}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <Td key={colIndex}>
                        <Input
                          type="text"
                          value={cell}
                          onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        />
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Button onClick={generateMarkdown} isLoading={isLoading}>
        Generate Markdown
      </Button>
      <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
      <Button onClick={resetData}>Reset Data</Button>
          <Textarea value={markdownOutput} size="lg" mt="4" mx="auto"/>
        
        </Box>
    </ChakraProvider>
  );
}

export default App;
