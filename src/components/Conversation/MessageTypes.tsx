import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DownloadSimple, Image } from "phosphor-react";

type TimelineMessageType = {
  type: "divider";
  text: string;
};

const Timeline = ({ message }: { message: TimelineMessageType }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider sx={{ width: "46%" }} />
      <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
        {message.text}
      </Typography>
      <Divider sx={{ width: "46%" }} />
    </Stack>
  );
};

type TextMessageType = {
  type: "msg";
  subtype: undefined;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const TextMessage = ({ message }: { message: TextMessageType }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={message.incoming ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          bgcolor: message.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={message.incoming ? theme.palette.text.primary : "white"}
        >
          {message.message}
        </Typography>
      </Box>
    </Stack>
  );
};

type MediaMessageType = {
  type: "msg";
  subtype: "img";
  img: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const MediaMessage = ({ message }: { message: MediaMessageType }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={message.incoming ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          bgcolor: message.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={message.img}
            alt={message.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={message.incoming ? theme.palette.text.primary : "white"}
          >
            {message.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

type ReplyMessageType = {
  type: "msg";
  subtype: "reply";
  reply: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const ReplyMessage = ({ message }: { message: ReplyMessageType }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={message.incoming ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          bgcolor: message.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            spacing={3}
            p={2}
            alignItems={"center"}
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text.primary}>
              {message.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={message.incoming ? theme.palette.text.primary : "white"}
          >
            {message.reply}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

type LinkMessageType = {
  type: "msg";
  subtype: "link";
  preview: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const LinkMessage = ({ message }: { message: LinkMessageType }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={message.incoming ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          bgcolor: message.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            spacing={3}
            p={2}
            alignItems={"center"}
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={message.preview}
              alt={message.message}
              style={{ maxHeight: 50, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              {/* Link Title */}
              <Typography
                variant="subtitle2"
                color={theme.palette.text.primary}
              >
                {/* {message.message} */}
                Creating Chat App
              </Typography>
              {/* Link */}
              {
                //@ts-ignore
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}
                  component={Link}
                  to={"//https://www.youtube.com"}
                >
                  {/* {message.message} */}
                  www.youtube.com
                </Typography>
              }
            </Stack>
          </Stack>
          <Typography
            variant="body2"
            color={message.incoming ? theme.palette.text.primary : "white"}
          >
            {message.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

type DocMessageType = {
  type: "msg";
  subtype: "doc";
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const DocMessage = ({ message }: { message: DocMessageType }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={message.incoming ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          bgcolor: message.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            spacing={3}
            p={2}
            alignItems={"center"}
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={message.incoming ? theme.palette.text.primary : "white"}
          >
            {message.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export type {
  TimelineMessageType,
  TextMessageType,
  MediaMessageType,
  ReplyMessageType,
  LinkMessageType,
  DocMessageType,
};
export {
  Timeline,
  TextMessage,
  MediaMessage,
  ReplyMessage,
  LinkMessage,
  DocMessage,
};
