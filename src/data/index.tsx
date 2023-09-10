import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Chats,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

const Profile_Menu = [
  {
    id: uuidv4(),
    title: "Profile",
    icon: <User />,
  },
  {
    id: uuidv4(),
    title: "Settings",
    icon: <Gear />,
  },
  {
    id: uuidv4(),
    title: "Profile",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
    to: "/app",
  },
  {
    index: 1,
    icon: <Chats />,
    to: "/group",
  },
  {
    index: 2,
    icon: <Users />,
    to: "/app",
  },
  {
    index: 3,
    icon: <Phone />,
    to: "/call",
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

const Chat_History = [
  {
    id: uuidv4(),
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "divider",
    text: "Today",
  },
  {
    id: uuidv4(),
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    id: uuidv4(),
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    id: uuidv4(),
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    id: uuidv4(),
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    id: uuidv4(),
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

const SHARED_LINKS = [
  {
    id: uuidv4(),
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
];

const SHARED_DOCS = [
  {
    id: uuidv4(),
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    id: uuidv4(),
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
];

const KEYBOARD_SHORTCUTS = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Cmd", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Cmd", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Cmd", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Cmd", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Cmd", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Cmd", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Cmd", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Cmd", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Cmd", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Cmd", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Cmd", "S"],
  },
];

export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  SHARED_DOCS,
  SHARED_LINKS,
  KEYBOARD_SHORTCUTS,
};
