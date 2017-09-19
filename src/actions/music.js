import * as actionTypes from '../constant/music';
//添加音乐
export function addMusic(data) {
    return {
        type: actionTypes.ADD_MUSIC,
        data
    }
}
//播放或暂停音乐
export function changePlayStatus(data) {
    return {
        type: actionTypes.CHANGE_MUSIC_STATUS,
        data
    }
}
//更改音乐
export function changeMusic(data){
    return {
        type: actionTypes.CHANGE_CURRENT_MUSIC,
        data
    }
}
export function addAndChangeMusic(data){
    return {
        type:actionTypes.ADD_AND_CHANGE_MUSIC,
        data
    }
}