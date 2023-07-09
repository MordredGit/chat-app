import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { SyntheticEvent, useState } from "react";
import { UpdateSidebarType } from "../redux/slices/app";
import { CaretLeft } from "phosphor-react";
import { useDispatch } from "../redux/store";
import { faker } from "@faker-js/faker";
import { SHARED_DOCS, SHARED_LINKS } from "../data";
import {
  DocMessage,
  DocMessageType,
  LinkMessage,
  LinkMessageType,
} from "./Conversation/MessageTypes";

type ValueType = "DOCS" | "LINKS" | "IMGS";

const SharedMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState<ValueType>("IMGS");

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: ValueType
  ) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0 0 2 rgba(0,0,0,0.25)",
            width: "100%",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Stack
            direction={"row"}
            sx={{ height: "100%", p: 2 }}
            alignItems={"center"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebarType("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>

        <Tabs
          sx={{ px: 2, pt: 2 }}
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Media" value={"IMGS"} />
          <Tab label="Links" value={"LINKS"} />
          <Tab label="Docs" value={"DOCS"} />
        </Tabs>

        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={value === "LINKS" ? 1 : 3}
        >
          {(() => {
            switch (value) {
              case "IMGS":
                return (
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {[1, 2, 3, 4, 5, 6].map((el) => (
                      <Grid item key={el} xs={12} md={6} lg={4}>
                        <img
                          width={"100%"}
                          src={faker.image.avatar()}
                          alt={faker.name.fullName()}
                        />
                      </Grid>
                    ))}
                  </Grid>
                );
              case "LINKS":
                return SHARED_LINKS.map((msg) => (
                  <LinkMessage
                    key={msg.id}
                    message={msg as unknown as LinkMessageType}
                  />
                ));
              case "DOCS":
                return SHARED_DOCS.map((msg) => (
                  <DocMessage
                    key={msg.id}
                    message={msg as unknown as DocMessageType}
                  />
                ));
              default:
                return "";
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
