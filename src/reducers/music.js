import * as actionTypes from '../constant/music';
const initialState = {
    musicList: []
};
function isMusicExist(musicData) {
    initialState.musicList.some(function (item) {
        return item.id === musicData.id;
    });
}
export default function music(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_MUSIC:
            if (!isMusicExist(action.data)) {
                let musicList=initialState.musicList;
                musicList.unshift(action.data)
                return Object.assign({},state,{
                    musicList:musicList
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}