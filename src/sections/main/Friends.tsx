import React, { SyntheticEvent, useEffect, useState } from "react";

import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";

import {
  FriendElement,
  FriendRequestElement,
  UserElement,
} from "../../components/Friends";
import {
  FetchFriends,
  FetchRequests,
  FetchUsers,
} from "../../redux/slices/app";
import { useDispatch, useSelector } from "../../redux/store";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);
  useEffect(() => {
    dispatch(FetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <UserElement key={user._id} id={user._id} {...user} img="aaaa" />
      ))}
    </ul>
  );
};

const FriendsList = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.app.friends);
  useEffect(() => {
    dispatch(FetchFriends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {friends.map((user) => (
        <FriendElement
          key={user._id}
          id={user._id}
          {...user}
          handleClose={handleClose}
        />
      ))}
    </ul>
  );
};

const FriendRequestsList = () => {
  const dispatch = useDispatch();
  const friendRequests = useSelector((state) => state.app.requests);
  useEffect(() => {
    dispatch(FetchRequests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {friendRequests.map((requests) => (
        <FriendRequestElement
          key={requests._id}
          {...requests.sender}
          id={requests._id}
          online={requests.sender.status}
        />
      ))}
    </ul>
  );
};

export type TabLabel = "explore" | "friends" | "requests";
const Friends = ({
  open,
  tabValue,
  handleClose,
}: {
  open: boolean;
  tabValue: TabLabel;
  handleClose: () => void;
}) => {
  const [value, setValue] = useState<TabLabel>(tabValue);
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: TabLabel
  ) => setValue(value);
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={"Explore"} value={"explore"} />
          <Tab label={"Friends"} value={"friends"} />
          <Tab label={"Requests"} value={"requests"} />
        </Tabs>
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case "explore":
                    return (
                      <div>
                        <UsersList />
                      </div>
                    );
                  case "friends":
                    return (
                      <div>
                        <FriendsList handleClose={handleClose} />
                      </div>
                    );
                  case "requests":
                    return (
                      <div>
                        <FriendRequestsList />
                      </div>
                    );
                }
              })()}
            </Stack>
          </Stack>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};

export default Friends;
