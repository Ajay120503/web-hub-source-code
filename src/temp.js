import { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon, FaTerminal } from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import './App.css';

function App() {
    const { colorMode, toggleColorMode } = useColorMode();

    // Load code from localStorage or use default values
    const [htmlCode, setHtmlCode] = useState(() => localStorage.getItem('htmlCode') || `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a sample HTML snippet.</p>
</body>
</html>`);

    const [cssCode, setCssCode] = useState(() => localStorage.getItem('cssCode') || `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    color: #333;
}`);

    const [jsCode, setJsCode] = useState(() => localStorage.getItem('jsCode') || `// Sample JavaScript code
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hello, World!');
});`);

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

    // Save code to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('htmlCode', htmlCode);
        localStorage.setItem('cssCode', cssCode);
        localStorage.setItem('jsCode', jsCode);
    }, [htmlCode, cssCode, jsCode]);

    return (
        <>
            <Box height='100vh'>
                <Box display="flex" justifyContent="flex-end" position='absolute' zIndex={2} top={0} right={0}>
                    <IconButton
                        aria-label="Toggle theme"
                        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                        onClick={toggleColorMode}
                        borderRadius="none"
                    />
                </Box>
                <Box>
                    <Tabs size='md' variant='enclosed' pt='1px'>
                        <TabList h="5vh">
                            <Tab borderRadius='none'><i style={{ paddingRight: '5px' }} className="fa-brands fa-html5"></i>Html</Tab>
                            <Tab borderRadius='none'><i style={{ paddingRight: '5px' }} className="fa-brands fa-css3-alt"></i>CSS</Tab>
                            <Tab borderRadius='none'><i style={{ paddingRight: '5px' }} className="fa-brands fa-js"></i>Javascript</Tab>
                            <Tab borderRadius='none'><FaTerminal style={{ paddingRight: '5px' }} />OUTPUT</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel padding="3px">
                                <Editor
                                    height="94vh"
                                    theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
                                    defaultLanguage="html"
                                    value={htmlCode}
                                    onChange={setHtmlCode}
                                    options={editorOptions}
                                />
                            </TabPanel>
                            <TabPanel padding="3px">
                                <Editor
                                    height="94vh"
                                    theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
                                    defaultLanguage="css"
                                    value={cssCode}
                                    onChange={setCssCode}
                                    options={editorOptions}
                                />
                            </TabPanel>
                            <TabPanel padding="3px">
                                <Editor
                                    height="94vh"
                                    theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
                                    defaultLanguage="javascript"
                                    value={jsCode}
                                    onChange={setJsCode}
                                    options={editorOptions}
                                />
                            </TabPanel>
                            <TabPanel padding="3px">
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
