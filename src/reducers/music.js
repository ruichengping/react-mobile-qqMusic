import * as actionTypes from '../constant/music';
import axios from 'axios';
const initialState = {
    currentMusic: {
        id: 26113988,
        name: '泡沫',
        al: {
            picUrl: "https://p1.music.126.net/4AlMpHmXuNSBf3Nn6xj2WQ==/2444214348569851.jpg"
        },
        ar: [
            {
                name: '邓紫棋'
            }
        ]
    },
    currentIndex: 0,
    isPlay: false,
    isCurrentMusicChange: false,
    musicList: [
        {
            id: 26113988,
            name: '泡沫',
            al: {
                picUrl: "https://p1.music.126.net/4AlMpHmXuNSBf3Nn6xj2WQ==/2444214348569851.jpg"
            },
            ar: [
                {
                    name: '邓紫棋'
                }
            ]
        }
    ],
    songListArray:[]
};
function isMusicExist(musicData,array) {
   return array.some((item)=>{
        return item.id === musicData.id;
    });
}
function isSongListExist(name,array){
    return array.some((item)=>{
        return item===name;
    });
}

export default function music(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_MUSIC:
            if (!isMusicExist(action.data,state.musicList)) {
                let musicList = state.musicList;
                musicList.unshift(action.data)
                return Object.assign({}, state, {
                    musicList: musicList
                });
            } else {
                return state;
            }
        case actionTypes.CHANGE_CURRENT_MUSIC:
            return Object.assign({}, state, {
                currentMusic: action.data,
                isCurrentMusicChange: true
            });
        case actionTypes.CHANGE_MUSIC_STATUS:
            return Object.assign({}, state, {
                isPlay: action.data,
                isCurrentMusicChange: false
            });
        case actionTypes.ADD_AND_CHANGE_MUSIC:
            let musicList = state.musicList;
            if (!isMusicExist(action.data,state.musicList)) {
                musicList.unshift(action.data)
            }
            return Object.assign({}, state, {
                musicList: musicList,
                currentMusic: action.data,
                currentIndex: 0,
                isCurrentMusicChange: true,
                isPlay: true
            });
        case actionTypes.PLAY_MUSIC_BY_INDEX:
            return Object.assign({}, state, {
                currentMusic: state.musicList[action.data],
                isCurrentMusicChange: true,
                isPlay: true,
                currentIndex: action.data
            });
        case actionTypes.CLEAR_MUSIC_LIST:
            return Object.assign({}, state, {
                currentMusic: {},
                isCurrentMusicChange: false,
                musicList: [],
                isPlay: false,
                currentIndex: 0
            });
        case actionTypes.REMOVE_MUSIC_FROM_LIST:
            let newMusicList=state.musicList;
            newMusicList.splice(action.data,1);
            if (action.data !== state.currentIndex) {
                return Object.assign({}, state, {
                    isCurrentMusicChange: false,
                    musicList: newMusicList
                });
            } else {
                return Object.assign({}, state, {
                        isCurrentMusicChange: newMusicList.length>0?true:false,
                        isPlay:newMusicList.length>0?true:false,
                        currentIndex:action.data,
                        currentMusic:newMusicList.length>0?newMusicList[action.data]:{},
                        musicList:newMusicList
                    });
            } 
        case actionTypes.ADD_SONG_LIST:
            if(!isSongListExist(action.data,state.songListArray)){
                let newSongListArray= state.songListArray;
                newSongListArray.unshift(action.data);
                return Object.assign({},state,{
                    songListArray:newSongListArray
                });
            }else{
                return state;
            }
        case actionTypes.REMOVE_SONG_LIST:
            let newSongListArray=state.songListArray.filter((item)=>{
                return !isSongListExist(item,action.data);
            });
            return Object.assign({},state,{
                songListArray:newSongListArray
            });
        default:
            return state;
    }
}