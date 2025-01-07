import { Box, Flex } from '@chakra-ui/react';

const ChatMessage = ({ messageText, variant }: { messageText: string; variant: string }) => {
  // https://dev.to/terenvelan/creating-variants-of-react-component-2b8m
  const flexAlignment = variant === 'agent' ? 'flex-start' : 'flex-end';
  const bgColor = variant === 'agent' ? 'teal.600' : 'blue.700';

  return (
    <Flex direction="column" w="100%" alignItems={flexAlignment}>
      <Box w="70%" bg={bgColor} color="white" rounded="lg" p="2">
        {messageText}
      </Box>
    </Flex>
  );
};

export default ChatMessage;
