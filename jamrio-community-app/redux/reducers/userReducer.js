import {createReducer} from '@reduxjs/toolkit';

export const userReducer = createReducer({}, builder => {
  builder

    //toast
    .addCase('TOAST_MESSAGE', (state, action) => {
      state.toast_message = action.payload;
    })

    // LOADERS
    .addCase('NOTIF_LOADING', (state, action) => {
      state.notif_loading = action.payload;
    })
    .addCase('USER_LOADING', (state, action) => {
      state.user_loading = action.payload;
    })
    .addCase('CHAT_LOADING', (state, action) => {
      state.chat_loading = action.payload;
    })
    .addCase('CREATE_USER_LOADING', (state, action) => {
      state.create_user_loading = action.payload;
    })
    .addCase('UPLOAD_VIDEO_LOADING', (state, action) => {
      state.upload_video_loading = action.payload;
    })

    // SUCCESS
    .addCase('ACCOUNT_ID', (state, action) => {
      state.accountId = action.payload;
    })
    .addCase('USER_DETAILS', (state, action) => {
      state.user = action.payload;
    })
    .addCase('USER_ERROR', (state, action) => {
      state.userError = action.payload;
    })
    .addCase('chat_messages', (state, action) => {
      state.chat_messages = action.payload;
    })
    .addCase('NOTIF_SUCCESS', (state, action) => {
      state.user_notifications = action.payload;
    })
    .addCase('MATCHES_SUCCESS', (state, action) => {
      state.match_success = action.payload;
    })
    .addCase('REJECTED_SUCCESS', (state, action) => {
      state.reject_success = action.payload;
    })
    .addCase('NOT_MY_MATCHES', (state, action) => {
      state.not_my_matches = action.payload;
    })
    .addCase('USERS_STATUS_CODE', (state, action) => {
      state.users_status_code = action.payload;
    })
    .addCase('CREATE_USER_SUCCESS', (state, action) => {
      state.user_created = action.payload;
    })
    .addCase('SWIPE_COUNT_RELOAD', (state, action) => {
      state.swipe_count_reload = action.payload;
    })
    .addCase('CURRENT_ROUTE', (state, action) => {
      state.current_route = action.payload;
    })
    .addCase('CHAT_SUCCESS', (state, action) => {
      state.chat_success = action.payload;
    })
    .addCase('PAUSE_VIDEO', (state, action) => {
      state.pause_video = action.payload;
    })
    .addCase('UPLOAD_VIDEO_SUCCESS', (state, action) => {
      state.upload_video_success = action.payload;
    })
    .addCase('GET_ALL_VIDEOS', (state, action) => {
      state.all_videos = action.payload;
    })
    .addCase('DELETE_VIDEO', (state, action) => {
      state.delete_video = action.payload;
    })
    .addCase('GET_ALL_TAGS', (state, action) => {
      state.all_tags = action.payload;
    })
    .addCase('TAG_ADD_SUCCESS', (state, action) => {
      state.tag_add_success = action.payload;
    })
    .addCase('OTHER_USER_DETAILS', (state, action) => {
      state.other_user_details = action.payload;
    })
    .addCase('ALL_CHATS', (state, action) => {
      state.all_chats = action.payload;
    })
    .addCase('PRIMARY_VIDEO', (state, action) => {
      state.primary_video = action.payload;
    })

    // ERROR
    .addCase('NOTIF_ERROR', (state, action) => {
      state.notif_error = action.payload;
    })
    .addCase('CREATE_USER_ERROR', (state, action) => {
      state.user_create_err = action.payload;
    })
    .addCase('UPLOAD_VIDEO_ERROR', (state, action) => {
      state.upload_video_error = action.payload;
    });
});
