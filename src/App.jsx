import { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, IconButton, useColorMode, Tooltip, useToast } from '@chakra-ui/react';
import { FaSun, FaMoon, FaTerminal, FaEraser, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import './App.css';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [htmlCode, setHtmlCode] = useState(() => localStorage.getItem('htmlCode') || ``);
  const [cssCode, setCssCode] = useState(() => localStorage.getItem('cssCode') || ``);
  const [jsCode, setJsCode] = useState(() => localStorage.getItem('jsCode') || ``);

  const toast = useToast();

  const editorOptions = {
    fontSize: 18,
    minimap: {
      enabled: false,
    },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    lineNumbers: "on",
    wordWrap: "on",
    contextMenu: true,
  };

  const generateOutput = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${cssCode}
          </style>
      </head>
      <body>
          ${htmlCode}
          <script>
            ${jsCode}
          </script>
      </body>
      </html>
    `;
  };

  useEffect(() => {
    localStorage.setItem('htmlCode', htmlCode);
    localStorage.setItem('cssCode', cssCode);
    localStorage.setItem('jsCode', jsCode);
  }, [htmlCode, cssCode, jsCode]);

  const handleClear = () => {
    setHtmlCode('');
    setCssCode('');
    setJsCode('');
    localStorage.removeItem('htmlCode');
    localStorage.removeItem('cssCode');
    localStorage.removeItem('jsCode');
    toast({
      description: "Clear the All Tabs.",
      status: 'success',
      duration: 3000,
      isClosable: false,
      position: 'top'
    })
  };

  return (
    <>
      <Box height='100vh'>
        <Box display="flex" justifyContent="flex-end" position='absolute' zIndex={2} top={0} right={0}>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            borderRadius="none"
            height="38px"
          />
          <Tooltip hasArrow placement='bottom-start' label="Clean the code">
            <IconButton
              aria-label="Clear code"
              icon={<FaEraser />}
              onClick={handleClear}
              borderRadius="none"
              height="38px"
            />
          </Tooltip>
        </Box>
        <Box>
          <Tabs size='md' variant='enclosed' pt='1px'>
            <TabList h="5vh">
              <Tooltip hasArrow label="Click me!">
                <Tab borderRadius='none'><FaHtml5 style={{ paddingRight: '5px', fontSize: "18px" }} />Html</Tab>
              </Tooltip>
              <Tooltip hasArrow label="Click me!">
                <Tab borderRadius='none'><FaCss3Alt style={{ paddingRight: '5px', fontSize: "18px" }} />CSS</Tab>
              </Tooltip>
              <Tooltip hasArrow label="Click me!">
                <Tab borderRadius='none'><FaJs style={{ paddingRight: '5px', fontSize: "18px" }} />Javascript</Tab>
              </Tooltip>
              <Tooltip hasArrow label="Show the Output">
                <Tab borderRadius='none' bg={colorMode === 'light' ? "#edf2f7" : "rgb(255,255,255,0.08);"}><FaTerminal style={{ paddingRight: '5px' }} /></Tab>
              </Tooltip>
            </TabList>
            <TabPanels>
              <TabPanel p="3px 0 0 0">
                <Editor
                  height="94vh"
                  theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
                  defaultLanguage="html"
                  value={htmlCode}
                  onChange={setHtmlCode}
                  options={editorOptions}
                />
              </TabPanel>
              <TabPanel p="3px 0 0 0">
                <Editor
                  height="94vh"
                  theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
                  defaultLanguage="css"
                  value={cssCode}
                  onChange={setCssCode}
                  options={editorOptions}
                />
              </TabPanel>
              <TabPanel p="3px 0 0 0">
                <Editor
                  height="94vh"
                  theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
                  defaultLanguage="javascript"
                  value={jsCode}
                  onChange={setJsCode}
                  options={editorOptions}
                />
              </TabPanel>
              <TabPanel p="3px 0 0 0">
                <Box height="94vh">
                  <iframe
                    title="Output"
                    srcDoc={generateOutput()}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

export default App;
