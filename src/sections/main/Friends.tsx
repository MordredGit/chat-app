import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";

import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";

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
        <li key={user._id}>
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.app.friends);
  useEffect(() => {
    dispatch(FetchFriends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {friends.map((user) => (
        <li key={user._id}>
          {user.firstName} {user.lastName}
        </li>
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
      {friendRequests.map((user) => (
        <li key={user._id}>
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  );
};

type TabLabel = "explore" | "friends" | "requests";
const Friends = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [value, setValue] = useState<TabLabel>("explore");
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
                        <FriendsList />
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
