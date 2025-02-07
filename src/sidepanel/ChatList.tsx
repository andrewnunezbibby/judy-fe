import ChatMessage from './ChatMessage';
import { Box, Button } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import { Messages } from './ExampleMessages';

const ChatList = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('LOADED');
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const sendHighlightCommand = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) {
        console.error('No active tab found');
        return;
      }

      await chrome.tabs.sendMessage(tab.id, {
        action: 'startGuide',
        selectors: ['compose', 'attach'],
      });
      console.log('Message sent successfully');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <Box>
      {Messages.map((message, index) => {
        if (message.isChatMessage) return <ChatMessage key={`${index}_message`} messageText={message.text} variant="agent" />;
        return <ChatMessage key={`${index}_message`} messageText={message.text} variant="user" />;
      })}
      <Button bg="blue.400" onClick={sendHighlightCommand}>
        Start Guide
      </Button>
      <div ref={bottomRef}></div>
      {/* {Messages[-1].isChatMessage && <Button>Start Guide</Button>} */}
    </Box>
  );
};

export default ChatList;

// "matches": ["https://*/*"],
// "matches": ["https://mail.google.com/*"],
