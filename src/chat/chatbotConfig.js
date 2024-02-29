import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import MessageParser from "./MessageParser";

const botName = "DocsBot";

const config = { 
  botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
    userMessageBox: {
      backgroundColor: "red",
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Hi I'm ${botName}. I’m here to help you explain how I work.`
    ),
    
  ],
  state: {
    gist: "",
  },
  customComponents: {
    
  header: () => <div style={{ backgroundColor: 'navy', padding: "5px", borderRadius: "3px" }}>Chat with our bot</div>,
  },
  widgets: [
    {
      widgetName: "messageParser",
      widgetFunc: (props) => <MessageParser {...props} />,
      mapStateToProps: ["gist"],
    },
  ],
};

export default config;