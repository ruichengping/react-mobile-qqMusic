import React from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import Control from '@/components/Control';
import MusicList from '@/components/MusicList';
import * as actions from '@/store/actions';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import playImg from '../../assets/imgs/icon-music-play.png';
import pauseImg from '../../assets/imgs/icon-music-pause.png';
import playListImg from '../../assets/imgs/icon-play-list.png';
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
    //获取歌曲信息
    getSongInfo(nextProps) {
        const {isPlay} = this;
        if (nextProps.currentMusic.id) {
            this.getMusicUrlById(nextProps.currentMusic.id, (url) => {
                this.setState({
                    currentMusicUrl: url
                });
                if (isPlay) {
                    this.qqMusicAudio.play();
                }
            });
        }
    }
    //根据歌曲id获取音乐url
    getMusicUrlById(id, callback) {
        axios.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${id}`).then((response) => {
            if (typeof callback === 'function') {
                callback(response.data.data[0].url);
            }
        });
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
        if (this.props.musicList.length > 0||this.state.isMusicListShow) {
            this.setState({
                isMusicListShow: !this.state.isMusicListShow
            });
        } else {
            Toast.info('暂无可播放的音乐', 1);
        }
    }
    componentWillMount() {
        this.getMusicUrlById(this.props.currentMusic.id, (url) => {
            this.setState({
                currentMusicUrl: url
            });
        });
    }
    componentDidMount(){
        const {musicList,currentIndex,changePlayStatus,playMusicByIndex} = this.props;
        this.qqMusicAudio.addEventListener("canplay",()=>{
            this.setState({
                totalSeconds:this.qqMusicAudio.duration
            });
        });
        this.qqMusicAudio.addEventListener("timeupdate",()=>{
            this.setState({
                currentSeconds:this.qqMusicAudio.currentTime
            });
        });
        this.qqMusicAudio.addEventListener("ended",()=>{
            if (musicList.length ===  1) {
                changePlayStatus(false)
            } else  {
                if(this.props.currentIndex<musicList.length-1){
                    playMusicByIndex(currentIndex+1);
                }else{
                    playMusicByIndex(0);                
                }
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isCurrentMusicChange&&nextProps.musicList.length>0) {
            this.getSongInfo(nextProps);
        }else{
            if(nextProps.isPlay){
                this.qqMusicAudio.play();
            }else{
                this.qqMusicAudio.pause();                
            }
        }
    }
    render() {
        return (
            <div className="qqMusic-home-footer border-top">
                <div className="qqMusic-home-footer-left">
                    <img className={this.props.isPlay ? 'qqMusic-home-footer-avatar active' : 'qqMusic-home-footer-avatar'} src={this.props.currentMusic.al ? this.props.currentMusic.al.picUrl : ''} onClick={this.consoleSwitch.bind(this)} />
                </div>
                <div className="qqMusic-home-footer-middle" onClick={this.consoleSwitch.bind(this)}>
                    <h4 className="qqMusic-home-footer-song">{this.props.currentMusic ? this.props.currentMusic.name : ''}</h4>
                    <p className="qqMusic-home-footer-singer">{this.props.currentMusic.ar ? this.props.currentMusic.ar[0].name : ''}</p>
                </div>
                <p className={this.props.musicList.length === 0 ? 'no-music show' : 'no-music'}>QQ音乐 听我想听的歌</p>
                <div className="qqMusic-home-footer-right">
                    <audio ref={(audio)=>this.qqMusicAudio=audio} src={this.state.currentMusicUrl} ></audio>
                    <img className="qqMusic-play-switch" src={this.props.isPlay ? pauseImg : playImg} onClick={this.changePlayState.bind(this)} />
                    <img className="qqMusic-play-list" src={playListImg} onClick={this.musicListSwitch.bind(this)} />
                </div>
                <Control changeCurrentTime={this.changeCurrentTime.bind(this)} currentSeconds={this.state.currentSeconds} totalSeconds={this.state.totalSeconds} isControlShow={this.state.isControlShow} changePlayState={this.changePlayState.bind(this)} consoleSwitch={this.consoleSwitch.bind(this)}></Control>
                <MusicList isMusicListShow={this.state.isMusicListShow} musicListSwitch={this.musicListSwitch.bind(this)}></MusicList>
            </div>
        )
    }
}
export default Bandstand;