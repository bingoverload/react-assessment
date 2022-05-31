import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TableForm from './Components/Table'
import Page404 from './Components/404';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Grid>
          <ColorModeSwitcher justifySelf="flex-end"/>
          <Routes>
            <Route path="/" element={<TableForm/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
