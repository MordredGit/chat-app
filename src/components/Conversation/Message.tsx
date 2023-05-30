import React from "react";
import { Box, Stack } from "@mui/material";

import { Chat_History } from "../../data";
import {
  DocMessage,
  DocMessageType,
  LinkMessage,
  LinkMessageType,
  MediaMessage,
  MediaMessageType,
  ReplyMessage,
  ReplyMessageType,
  TextMessage,
  TextMessageType,
  Timeline,
  TimelineMessageType,
} from "./MessageTypes";

type ChatMessageType =
  | DocMessageType
  | MediaMessageType
  | LinkMessageType
  | ReplyMessageType
  | TextMessageType
  | TimelineMessageType;

const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {(Chat_History as unknown as [ChatMessageType]).map(
          (message: ChatMessageType) => {
            switch (message.type) {
              case "divider":
                return <Timeline key={message.text} message={message} />;
              case "msg":
                switch (message.subtype) {
                  case "img":
                    return (
                      <MediaMessage key={message.id} message={message} />
                    );
                  case "doc":
                    return (
                      <DocMessage key={message.id} message={message} />
                    );
                  case "link":
                    return (
                      <LinkMessage key={message.id} message={message} />
                    );
                  case "reply":
                    return (
                      <ReplyMessage key={message.id} message={message} />
                    );
                  default:
                    return (
                      <TextMessage
                        key={message.id}
                        message={message as unknown as TextMessageType}
                      />
                    );
                }
            }
            return <></>;
          }
        )}
      </Stack>
    </Box>
  );
};

export default Message;
