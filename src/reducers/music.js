import * as actionTypes from '../constant/music';
import axios from 'axios';
const initialState = {
    currentMusic:{
        id:26113988,
        name:'泡沫',
        al:{
            picUrl:"https://p1.music.126.net/4AlMpHmXuNSBf3Nn6xj2WQ==/2444214348569851.jpg"
        },
        ar:[
            {
                name:'邓紫棋'
            }
        ]
    },
    isPlay:false,
    isCurrentMusicChange:false,
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
        case actionTypes.CHANGE_CURRENT_MUSIC:
            return Object.assign({},state,{
                currentMusic:action.data,
                isCurrentMusicChange:true
            });
        case actionTypes.CHANGE_MUSIC_STATUS:
            return Object.assign({},state,{
                isPlay:action.data,
                isCurrentMusicChange:false
            }); 
        case actionTypes.ADD_AND_CHANGE_MUSIC:
            let musicList=initialState.musicList;
            if (!isMusicExist(action.data)) {
                musicList.unshift(action.data)
            } 
            return Object.assign({},state,{
                musicList:musicList,
                currentMusic:action.data,
                isCurrentMusicChange:true,
                isPlay:true
            });
        default:
            return state;
    }
}