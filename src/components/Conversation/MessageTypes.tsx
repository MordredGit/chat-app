import React from "react";
import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../data";

type TimelineMessageType = {
  id: string;
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
  id: string;
  type: "msg";
  subtype: undefined;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const TextMessage = ({
  message,
  showMenu = false,
}: {
  message: TextMessageType;
  showMenu?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      // alignItems={"center"}
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
      {showMenu && <MessageOptions />}
    </Stack>
  );
};

type MediaMessageType = {
  id: string;
  type: "msg";
  subtype: "img";
  img: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const MediaMessage = ({
  message,
  showMenu = false,
}: {
  message: MediaMessageType;
  showMenu?: boolean;
}) => {
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
      {showMenu && <MessageOptions />}
    </Stack>
  );
};

type ReplyMessageType = {
  id: string;
  type: "msg";
  subtype: "reply";
  reply: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const ReplyMessage = ({
  message,
  showMenu = false,
}: {
  message: ReplyMessageType;
  showMenu?: boolean;
}) => {
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
      {showMenu && <MessageOptions />}
    </Stack>
  );
};

type LinkMessageType = {
  id: string;
  type: "msg";
  subtype: "link";
  preview: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const LinkMessage = ({
  message,
  showMenu = false,
}: {
  message: LinkMessageType;
  showMenu?: boolean;
}) => {
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
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}
                  component={Link}
                  href={message.preview}
                >
                  {message.preview}
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
      {showMenu && <MessageOptions />}
    </Stack>
  );
};

type DocMessageType = {
  id: string;
  type: "msg";
  subtype: "doc";
  message: string;
  incoming: boolean;
  outgoing: boolean;
};

const DocMessage = ({
  message,
  showMenu = false,
}: {
  message: DocMessageType;
  showMenu?: boolean;
}) => {
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
      {showMenu && <MessageOptions />}
    </Stack>
  );
};

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ButtonBase
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <DotsThreeVertical size={20} />
      </ButtonBase>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((option) => (
            <MenuItem key={option.title} onClick={handleClose}>
              {option.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
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
