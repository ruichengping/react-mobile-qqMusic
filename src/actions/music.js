import * as actionTypes from '../constant/music';
//添加音乐
export function addMusic(data) {
    return {
        type: actionTypes.ADD_MUSIC,
        data
    }
}
//播放音乐
export function playMusic(data) {
    return {
        type: actionTypes.PLAY_MUSIC,
        data
    }
}

//暂停音乐
export function pauseMusic(data) {
    return {
        type: actionTypes.PAUSE_MUSIC,
        data
    }
}