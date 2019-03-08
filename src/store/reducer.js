import * as actionTypes from './actionTypes';
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
  const {type,payload} = action;
  switch (type) {
      case actionTypes.ADD_MUSIC:
          if (!isMusicExist(payload,state.musicList)) {
              let musicList = state.musicList;
              musicList.unshift(payload)
              return Object.assign({}, state, {
                  musicList: musicList
              });
          } else {
              return state;
          }
      case actionTypes.CHANGE_CURRENT_MUSIC:
          return Object.assign({}, state, {
              currentMusic: payload,
              isCurrentMusicChange: true
          });
      case actionTypes.CHANGE_MUSIC_STATUS:
          return Object.assign({}, state, {
              isPlay: payload,
              isCurrentMusicChange: false
          });
      case actionTypes.ADD_AND_CHANGE_MUSIC:
          let musicList = state.musicList;
          if (!isMusicExist(payload,state.musicList)) {
              musicList.unshift(payload)
          }
          return Object.assign({}, state, {
              musicList: musicList,
              currentMusic: payload,
              currentIndex: 0,
              isCurrentMusicChange: true,
              isPlay: true
          });
      case actionTypes.PLAY_MUSIC_BY_INDEX:
          return Object.assign({}, state, {
              currentMusic: state.musicList[payload],
              isCurrentMusicChange: true,
              isPlay: true,
              currentIndex: payload
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
          newMusicList.splice(payload,1);
          if (payload !== state.currentIndex) {
              return Object.assign({}, state, {
                  isCurrentMusicChange: false,
                  musicList: newMusicList
              });
          } else {
              return Object.assign({}, state, {
                      isCurrentMusicChange: newMusicList.length>0?true:false,
                      isPlay:newMusicList.length>0?true:false,
                      currentIndex:payload,
                      currentMusic:newMusicList.length>0?newMusicList[payload]:{},
                      musicList:newMusicList
                  });
          } 
      case actionTypes.ADD_SONG_LIST:
          if(!isSongListExist(payload,state.songListArray)){
              let newSongListArray= state.songListArray;
              newSongListArray.unshift(payload);
              return Object.assign({},state,{
                  songListArray:newSongListArray
              });
          }else{
              return state;
          }
      case actionTypes.REMOVE_SONG_LIST:
          let newSongListArray=state.songListArray.filter((item)=>{
              return !isSongListExist(item,payload);
          });
          return Object.assign({},state,{
              songListArray:newSongListArray
          });
      default:
          return state;
  }
}