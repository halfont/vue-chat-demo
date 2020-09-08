
/* eslint-disable no-new */

const rooms = {
    namespaced: true,
    state: {
        rooms: [],
        chats: {},
        login: {id: 0, name: "n/a"},
        users: [],
        allusers: [],
    },
    mutations: {
        SET_ROOMS(state, data) {
            state.rooms=data;
        },
        SET_USERS(state, data) {
            state.users=data;
        },
        SET_ALLUSERS(state, data) {
            state.allusers=data;
        },
        SET_CHATS(state, data) {
            state.chats=data;
        },
        SET_LOGIN(state, data) {
            state.login=data;
        }
    },
    actions: {
        setRooms({ commit }, rooms) {
            commit("SET_ROOMS", rooms);
        },
        setUsers({ commit }, users) {
            commit("SET_USERS", users);
        },
        setAllUsers({ commit }, users) {
            commit("SET_ALLUSERS", users);
        },
        setChatData({ commit }, chat) {
            commit("SET_CHATS", chat);
        },
        setRegisteredUser({ commit }, login) {
            commit("SET_LOGIN", login);
        }

    },
    getters: {
        roomList: state => state.rooms ,
        chatData: state => state.chats,
        loggedinUser: state => state.login,
        allUsersList: state => state.allusers,
        usersList: state => state.users
    }
}

export default rooms