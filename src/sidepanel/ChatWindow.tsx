import '../App.css';
import { Box, Flex, Textarea } from '@chakra-ui/react';
import ChatList from './ChatList';

const ChatWindow = () => {
  return (
    <Box height="90vh" padding="15px" bg="gray.50">
      <Flex direction="column" height="100%">
        <Box flex="1" overflowY="scroll" marginBottom="10px">
          <ChatList />
        </Box>

        <Box>
          <Textarea placeholder="What's your question" variant="outline" />
        </Box>
      </Flex>
    </Box>
  );
};

export default ChatWindow;
