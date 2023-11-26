import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

import { dispatch as storeDispatch, RootReducerState } from "../store";

export type MessageType = {
  from: string;
  to: string;
  createdAt: Date;
  text?: string;
  file?: string;
};
export type IndividualConversationResponseType = {
  _id: string;
  participants: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: boolean;
    avatar: string;
  }[];
  messages: MessageType[];
};

export type ConversationType = {
  id: string;
  name: string;
  img: string;
  msg: string;
  time: string;
  online: boolean;
  unread: number;
  pinned: boolean;
};

const initialState = {
  directChat: {
    conversations: [] as ConversationType[],
    currentConversation: null as ConversationType | null,
    currentMessages: [],
  },
  groupChat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchIndividualConversations(
      state,
      action: {
        type: string;
        payload: {
          userId: string;
          conversations: IndividualConversationResponseType[];
        };
      }
    ) {
      const list = action.payload.conversations.map((conversation) => {
        const otherUser = conversation.participants.find(
          (participant) => participant._id !== action.payload.userId
        );
        if (!otherUser) {
          console.log(
            "Other user not found in conversation: ",
            conversation._id
          );
          return [];
        }
        return {
          id: conversation._id,
          name: otherUser.firstName + " " + otherUser.lastName,
          img: otherUser.avatar,
          msg: faker.music.songName(),
          time: "9:36",
          // msg: conversation.messages[-1].text
          //   ? conversation.messages[-1].text
          //   : conversation.messages[-1].file,
          // time: conversation.messages[-1].createdAt,

          online: otherUser.status,
          unread: 0,
          pinned: false,
        };
      });

      state.directChat.conversations = list as ConversationType[];
    },
    updateIndividualConversations(
      state,
      action: {
        type: string;
        payload: {
          userId: string;
          conversation: IndividualConversationResponseType;
        };
      }
    ) {
      state.directChat.conversations = state.directChat.conversations.map(
        (conversation) => {
          if (conversation.id === action.payload.conversation._id)
            return conversation;
          const otherUser = action.payload.conversation.participants.find(
            (participant) => participant._id !== action.payload.userId
          );

          if (!otherUser) {
            console.log(
              "Other user not found in conversation: ",
              conversation.id
            );
            return {} as ConversationType;
          }

          return {
            id: action.payload.conversation._id,
            name: otherUser.firstName + " " + otherUser.lastName,
            img: otherUser.avatar,
            msg: faker.music.songName(),
            time: "9:36",
            // msg: conversation.messages[-1].text
            //   ? conversation.messages[-1].text
            //   : conversation.messages[-1].file,
            // time: conversation.messages[-1].createdAt,

            online: otherUser.status,
            unread: 0,
            pinned: false,
          };
        }
      );
    },
    addIndividualConversations(
      state,
      action: {
        type: string;
        payload: {
          userId: string;
          conversation: IndividualConversationResponseType;
        };
      }
    ) {
      const otherUser = action.payload.conversation.participants.find(
        (participant) => participant._id !== action.payload.userId
      );
      if (!otherUser) {
        console.log(
          "Other user not found in conversation: ",
          action.payload.conversation._id
        );
        return;
      }
      state.directChat.conversations.push({
        id: action.payload.conversation._id,
        name: otherUser.firstName + " " + otherUser.lastName,
        img: otherUser.avatar,
        msg: faker.music.songName(),
        time: "9:36",
        // msg: conversation.messages[-1].text
        //   ? conversation.messages[-1].text
        //   : conversation.messages[-1].file,
        // time: conversation.messages[-1].createdAt,

        online: otherUser.status,
        unread: 0,
        pinned: false,
      });
    },
  },
});

export default slice.reducer;

export const FetchIndividualConversations = ({
  conversations,
}: {
  conversations: IndividualConversationResponseType[];
}) => {
  return async (
    dispatch: typeof storeDispatch,
    getState: () => RootReducerState
  ) => {
    const userId = getState().auth.userId;
    dispatch(
      slice.actions.fetchIndividualConversations({ userId, conversations })
    );
  };
};
export const UpdateIndividualConversations = ({
  conversation,
}: {
  conversation: IndividualConversationResponseType;
}) => {
  return async (
    dispatch: typeof storeDispatch,
    getState: () => RootReducerState
  ) => {
    const userId = getState().auth.userId;
    dispatch(
      slice.actions.updateIndividualConversations({ userId, conversation })
    );
  };
};
export const AddIndividualConversations = ({
  conversation,
}: {
  conversation: IndividualConversationResponseType;
}) => {
  return async (
    dispatch: typeof storeDispatch,
    getState: () => RootReducerState
  ) => {
    const userId = getState().auth.userId;
    dispatch(
      slice.actions.addIndividualConversations({ userId, conversation })
    );
  };
};
