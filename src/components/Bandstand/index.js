import React from 'react';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import Control from '@/components/Control';
import MusicList from '@/components/MusicList';
import * as actions from '@/store/actions';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import {API} from '@/api';
import playImg from '@/assets/icon-music-play.png';
import pauseImg from '@/assets/icon-music-pause.png';
import playListImg from '@/assets/icon-play-list.png';
import "./style.scss";

@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class Bandstand extends React.Component {
    state={
        isMusicListShow: false,
        isControlShow: false,
        currentMusicUrl: '',
        currentSeconds:0,
        totalSeconds:0
    }
    //改变播放状态
    changePlayState=()=>{
        const {changePlayStatus,isPlay,musicList} = this.props;
        if (musicList.length > 0) {
            changePlayStatus(!isPlay);
            if (!isPlay) {
                this.qqmusicAudio.play();
            } else {
                this.qqmusicAudio.pause();
            }
        } else {
            Toast.info('暂无可播放的音乐', 1);
        }
    }
    //根据歌曲id获取音乐url
    getMusicById(id, callback) {
        API.getMusicUrl({
            id
        }).then((data)=>{
            if (typeof callback === 'function') {
                callback(data);
            }
        })
    }
    consoleSwitch=()=>{
        this.setState({
            isControlShow: !this.state.isControlShow
        });
    }
    changeCurrentTime=(seconds)=>{
        this.setState({
            currentSeconds:seconds
        });
        this.qqmusicAudio.currentTime=seconds;
    }
    musicListSwitch=()=>{
        const {musicList} = this.props;
        const {isMusicListShow} = this.state;
        if (musicList.length > 0||isMusicListShow) {
            this.setState({
                isMusicListShow: !isMusicListShow
            });
        } else {
            Toast.info('暂无可播放的音乐', 1);
        }
    }
    componentDidMount(){
        const {musicList,currentMusic,changePlayStatus,playSpecificMusicByMid,addAndChangeMusic} = this.props;
        this.getMusicById('000cwwze4FkFj4',(data)=>{
            addAndChangeMusic(data,false);
        });
        this.qqmusicAudio.oncanplay=()=>{
            this.qqmusicAudio&&this.setState({
                totalSeconds:this.qqmusicAudio.duration
            });
        };
        this.qqmusicAudio.ontimeupdate=()=>{
            this.qqmusicAudio&&this.setState({
                currentSeconds:this.qqmusicAudio.currentTime
            });
        };
        this.qqmusicAudio.onended=()=>{
            if (musicList.length ===  1) {
                changePlayStatus(false)
            } else  {
                const currentIndex = musicList.findIndex((music)=>music.mid===currentMusic.mid)
                if(currentIndex<musicList.length-1){
                    playSpecificMusicByMid(currentIndex+1);
                }else{
                    playSpecificMusicByMid(0);                
                }
            }
        };
    }
    componentDidUpdate() {
        const {isPlay} = this.props;
        if(isPlay){
            this.qqmusicAudio.play();
        }else{
            this.qqmusicAudio.pause();                
        }
    }
    render() {
        const {currentMusic={},isPlay,musicList} = this.props;
        const {title,author,pic,url} = currentMusic;
        return (
            <div className="qqmusic-home-footer border-top">
                <div className="left">
                    <img className={classnames('avatar',isPlay ? 'active' : '')} src={pic} onClick={this.consoleSwitch} />
                </div>
                <div className="center" onClick={this.consoleSwitch}>
                    <h4 className="song">{title}</h4>
                    <p className="singer">{author}</p>
                </div>
                <p className={musicList.length === 0 ? 'no-music show' : 'no-music'}>QQ音乐 听我想听的歌</p>
                <div className="right">
                    <audio ref={(audio)=>this.qqmusicAudio=audio} src={url} ></audio>
                    <img className="qqmusic-play-switch" src={isPlay ? pauseImg : playImg} onClick={this.changePlayState} />
                    <img className="qqmusic-play-list" src={playListImg} onClick={this.musicListSwitch} />
                </div>
                <Control changeCurrentTime={this.changeCurrentTime} currentSeconds={this.state.currentSeconds} totalSeconds={this.state.totalSeconds} isControlShow={this.state.isControlShow} changePlayState={this.changePlayState} consoleSwitch={this.consoleSwitch}></Control>
                <MusicList isMusicListShow={this.state.isMusicListShow} musicListSwitch={this.musicListSwitch}></MusicList>
            </div>
        )
    }
}
export default Bandstand;