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
} from '@chakra-ui/react';
import './App.css';

function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableData, setTableData] = useState(createEmptyTableData(rows, cols));
  const [markdownOutput, setMarkdownOutput] = useState('');
  

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
    const markdown = tableData.map(row => `| ${row.join(' | ')} |`).join('\n');
    setMarkdownOutput(markdown);
  }

  const toast = useToast();

  function copyToClipboard() {
    navigator.clipboard.writeText(markdownOutput)
      .then(() => {
        toast({
          title: 'Copied to Clipboard',
          description: 'The Markdown content has been copied to the clipboard.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Unable to copy to clipboard', error);
        toast({
          title: 'Error',
          description: 'Unable to copy to clipboard. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }


  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <ColorModeProvider>
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

          <Button onClick={generateMarkdown}>Generate Markdown</Button>
          <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
          <Textarea value={markdownOutput} size="lg" mt="4" mx="auto"/>
        </Box>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
