import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  IconButton,
  Typography,
  Zoom,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Bot } from "lucide-react";
import { Close } from "@mui/icons-material";
import { chatServices } from "../../ services/chat/chatServices";
import { string } from "yup";

interface MessageProps {
  isUser: boolean;
}

const ChatButton = styled(Button)(({ theme }) => ({
  zIndex: 10000,
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  minWidth: "unset",
  backgroundColor: "rgb(141 183 216)",
  color: "#fff",
  "&:hover": {
    transform: "scale(1.1)",
    transition: "all 0.3s ease-in-out",
  },
}));

const ChatBox = styled(Paper)(({ theme }) => ({
  zIndex: 1000000,
  position: "fixed",
  bottom: "6rem",
  right: "2rem",
  width: "350px",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    right: "5%",
    height: "70vh",
  },
}));

const MessageList = styled(List)({
  flex: 1,
  overflow: "auto",
  padding: "1rem",
});

const MessageInput = styled(Box)({
  padding: "1rem",
  borderTop: "1px solid rgba(0,0,0,0.1)",
  display: "flex",
  gap: "0.5rem",
});

const Message = styled(ListItem)<MessageProps>(({ isUser }) => ({
  flexDirection: "column",
  alignItems: isUser ? "flex-end" : "flex-start",
  padding: "0.5rem",
}));

const MessageContent = styled(Paper)<MessageProps>(({ isUser }) => ({
  padding: "0.5rem 1rem",
  backgroundColor: isUser ? "rgb(100 132 194)" : "#DEE5D4",
  color: isUser ? "#fff" : "#000",
  borderRadius: "12px",
  maxWidth: "80%",
}));

interface ChatMessage {
  text: string | [];
  isUser: boolean;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }]);
      console.log(typeof message);
      try {
        const response = await chatServices.ChatRecommendation({
          topic: message,
        });
        if (response.status === 200) {
          let books = [];
          books = response?.data?.books;
          let str = `Suggested Books:\n\n`;
    
          books.forEach((book: string) => {
            str += book +"/"+ '\n';
          });

          setMessages((prev) => [...prev, { text: str, isUser: false }]);
        }
      } catch (error: any) {
        // Handle error
      } finally {
        setMessage("");
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)} aria-label="Open chat">
        <Bot size={40} />
      </ChatButton>

      <Zoom in={isOpen}>
        <ChatBox>
          <Box
            sx={{
              padding: "1rem",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Chat Support</Typography>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <Close />
            </IconButton>
          </Box>

          <MessageList>
            {messages.map((msg, index) => (
              <Message key={index} isUser={msg.isUser}>
                <MessageContent isUser={msg.isUser}>
                  <Typography>{msg.text}</Typography>
                </MessageContent>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </MessageList>

          <MessageInput>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!message.trim()}
              aria-label="Send message"
            >
              <ChevronRightIcon />
            </IconButton>
          </MessageInput>
        </ChatBox>
      </Zoom>
    </>
  );
};

export default ChatWidget;
