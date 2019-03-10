import React from 'react';
import {bindActionCreators} from 'redux';
import Control from '@/components/Control';
import MusicList from '@/components/MusicList';
import * as actions from '@/store/actions';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import {API} from '@/api';
import playImg from '@/assets/imgs/icon-music-play.png';
import pauseImg from '@/assets/imgs/icon-music-pause.png';
import playListImg from '@/assets/imgs/icon-play-list.png';
import "./style.scss";

@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class Bandstand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMusicListShow: false,
            isControlShow: false,
            currentMusicUrl: '',
            currentSeconds:0,
            totalSeconds:0
        }
    }
    //改变播放状态
    changePlayState() {
        const {changePlayStatus,isPlay,musicList} = this.props;
        if (musicList.length > 0) {
            changePlayStatus(!isPlay);
            if (!isPlay) {
                this.qqMusicAudio.play();
            } else {
                this.qqMusicAudio.pause();
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
    consoleSwitch() {
        this.setState({
            isControlShow: !this.state.isControlShow
        });
    }
    changeCurrentTime(seconds){
        this.setState({
            currentSeconds:seconds
        });
        this.qqMusicAudio.currentTime=seconds;
    }
    musicListSwitch() {
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
            addAndChangeMusic(data);
        });
        this.qqMusicAudio.oncanplay=()=>{
            this.qqMusicAudio&&this.setState({
                totalSeconds:this.qqMusicAudio.duration
            });
        };
        this.qqMusicAudio.ontimeupdate=()=>{
            this.qqMusicAudio&&this.setState({
                currentSeconds:this.qqMusicAudio.currentTime
            });
        };
        this.qqMusicAudio.onended=()=>{
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
            this.qqMusicAudio.play();
        }else{
            this.qqMusicAudio.pause();                
        }
    }
    render() {
        const {currentMusic,isPlay,musicList} = this.props;
        const {title,author,pic,url} = currentMusic;
        return (
            <div className="qqMusic-home-footer border-top">
                <div className="qqMusic-home-footer-left">
                    <img className={isPlay ? 'qqMusic-home-footer-avatar active' : 'qqMusic-home-footer-avatar'} src={pic} onClick={this.consoleSwitch.bind(this)} />
                </div>
                <div className="qqMusic-home-footer-middle" onClick={this.consoleSwitch.bind(this)}>
                    <h4 className="qqMusic-home-footer-song">{title}</h4>
                    <p className="qqMusic-home-footer-singer">{author}</p>
                </div>
                <p className={musicList.length === 0 ? 'no-music show' : 'no-music'}>QQ音乐 听我想听的歌</p>
                <div className="qqMusic-home-footer-right">
                    <audio ref={(audio)=>this.qqMusicAudio=audio} src={url} ></audio>
                    <img className="qqMusic-play-switch" src={isPlay ? pauseImg : playImg} onClick={this.changePlayState.bind(this)} />
                    <img className="qqMusic-play-list" src={playListImg} onClick={this.musicListSwitch.bind(this)} />
                </div>
                <Control changeCurrentTime={this.changeCurrentTime.bind(this)} currentSeconds={this.state.currentSeconds} totalSeconds={this.state.totalSeconds} isControlShow={this.state.isControlShow} changePlayState={this.changePlayState.bind(this)} consoleSwitch={this.consoleSwitch.bind(this)}></Control>
                <MusicList isMusicListShow={this.state.isMusicListShow} musicListSwitch={this.musicListSwitch.bind(this)}></MusicList>
            </div>
        )
    }
}
export default Bandstand;