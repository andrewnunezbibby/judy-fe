import ChatMessage from './ChatMessage';
import { Box } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import { Messages } from './ExampleMessages';

const ChatList = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return (
    <Box>
      {Messages.map((message, index) => {
        if (message.isChatMessage) return <ChatMessage key={`${index}_message`} messageText={message.text} variant="agent" />;
        return <ChatMessage key={`${index}_message`} messageText={message.text} variant="user" />;
      })}
      <div ref={bottomRef}></div>
    </Box>
  );
};

export default ChatList;
