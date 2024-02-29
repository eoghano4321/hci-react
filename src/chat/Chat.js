import React from "react";
import Chatbot from "react-chatbot-kit";
import "./Chat.css";

import config from "./chatbotConfig";
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";

function Chat() {
  return (
    <div className="ChatBox">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default Chat;