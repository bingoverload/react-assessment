import React from 'react'
import {Center, Button} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
const Page404 = () => {
  return (
    <div>
        <Center>
            <h1>404 Not Found</h1>
        </Center>
        <Button colorScheme={'teal'}><Link to="/">Back Home</Link></Button>
    </div>
  )
}

export default Page404