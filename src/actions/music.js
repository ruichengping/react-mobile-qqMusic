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
export function playMusicByIndex(data){
    return {
        type:actionTypes.PLAY_MUSIC_BY_INDEX,
        data
    }
}
export function clearMusicList(){
    return {
        type:actionTypes.CLEAR_MUSIC_LIST,
    }
}
export function removeMusicFromList(data){
    return {
        type:actionTypes.REMOVE_MUSIC_FROM_LIST,
        data
    }
}
export function addSongList(data){
    return {
        type:actionTypes.ADD_SONG_LIST,
        data
    }
}
export function removeSongList(data){
    return {
        type:actionTypes.REMOVE_SONG_LIST,
        data
    }
}