import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../../data";
import {
  Search,
  SearchIconWrapper,
  SearchInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import CreateGroup from "../../sections/main/CreateGroup";

const Group = () => {
  const theme = useTheme();
  const [openCreateGroupDialog, setOpenCreateGroupDialog] = useState(false);

  const handleOpenCreateGroupDialog = () => {
    setOpenCreateGroupDialog(true);
  };

  const handleCloseCreateGroupDialog = () => {
    setOpenCreateGroupDialog(false);
  };

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            bgcolor: (theme) => theme.palette.background.paper,
            width: 320,
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack
            p={3}
            spacing={2}
            sx={{
              maxHeight: "100vh",
            }}
          >
            <Typography paddingLeft={1} variant="h5">
              Groups
            </Typography>
            <Stack>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <SearchInputBase placeholder="Search..." />
              </Search>
            </Stack>
            <Stack spacing={1}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={1.5}
              >
                <Typography
                  variant="subtitle2"
                  component={Link}
                  sx={{ cursor: "pointer" }}
                  onClick={handleOpenCreateGroupDialog}
                >
                  Create New Group
                </Typography>
                <IconButton onClick={handleOpenCreateGroupDialog}>
                  <Plus
                    size={24}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Stack>
              <Divider />
            </Stack>
            <Stack
              spacing={2}
              sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
            >
              <SimpleBarStyle timeout={500}>
                <Stack spacing={2.4}>
                  <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                    Pinned
                  </Typography>
                  {ChatList.filter((chat) => chat.pinned).map((chat) => (
                    <ChatElement key={chat.id} {...chat} />
                  ))}
                  <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                    All Group Chats
                  </Typography>
                  {ChatList.filter((chat) => !chat.pinned).map((chat) => (
                    <ChatElement key={chat.id} {...chat} />
                  ))}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
      </Stack>
      {openCreateGroupDialog && (
        <CreateGroup
          open={openCreateGroupDialog}
          handleClose={handleCloseCreateGroupDialog}
        />
      )}
    </>
  );
};

export default Group;

// // TODO: Make it slide in and out from left for smaller windows
// const Chats = () => {
//   const theme = useTheme();
//   const isLightMode = theme.palette.mode === "light";
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: 320,
//         backgroundColor: isLightMode
//           ? "#F8FAFF"
//           : theme.palette.background.paper, // "#F8FAFF",
//         boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
//       }}
//     >
//       <Stack
//         p={3}
//         spacing={2}
//         sx={{
//           height: "100vh",
//         }}
//       >
//         <Stack
//           direction={"row"}
//           alignItems={"center"}
//           justifyContent="space-between"
//         >
//           <Typography paddingLeft={1} variant="h5">
//             Chats
//           </Typography>
//           <IconButton>
//             <CircleDashed />
//           </IconButton>
//         </Stack>
//         <Stack>
//           <Search>
//             <SearchIconWrapper>
//               <MagnifyingGlass color="#709CE6" />
//             </SearchIconWrapper>
//             <SearchInputBase placeholder="Search..." />
//           </Search>
//         </Stack>
// <Stack spacing={1}>
//   <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
//     <ArchiveBox size={24} />
//     <Button>Archive</Button>
//   </Stack>
//   <Divider />
// </Stack>
// <Stack
//   spacing={2}
//   sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
// >
//   <SimpleBarStyle timeout={500}>
//     <Stack spacing={2.4}>
//       <Typography variant="subtitle2" sx={{ color: "#676767" }}>
//         Pinned
//       </Typography>
//       {ChatList.filter((chat) => chat.pinned).map((chat) => (
//         <ChatElement key={chat.id} {...chat} />
//       ))}
//     </Stack>
//     <Stack spacing={2.4}>
//       <Typography variant="subtitle2" sx={{ color: "#676767" }}>
//         All Chats
//       </Typography>
//       {ChatList.filter((chat) => !chat.pinned).map((chat) => (
//         <ChatElement key={chat.id} {...chat} />
//       ))}
//     </Stack>
//   </SimpleBarStyle>
// </Stack>
//         <Stack></Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default Chats;
