import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Carousel } from 'antd-mobile';
import * as musicActions from '../../actions/music.js';
import util from '../../utils/util.js';
import './Control.scss';
class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldSongId: this.props.currentMusic.id,
            lyricArray: [],
            oldCurrentSeconds:0,
            activeIndex:0
        }
    }
    getLyricAjax(id) {
        axios.get(`https://api.imjad.cn/cloudmusic/?type=lyric&id=${id}&br=128000`).then((response) => {
                let lyric = response.data.lrc.lyric;
                this.setState({
                    lyricArray: util.parseLyric(lyric)
                });
            }).catch(function (error) {
                console.log(error);
            });
    }
    //播放上一首
    prevMusic() {
        if (this.props.currentIndex === 0) {
            this.props.dispatch(musicActions.playMusicByIndex(this.props.musicList.length - 1));
        } else {
            this.props.dispatch(musicActions.playMusicByIndex(this.props.currentIndex - 1));
        }
    }
    //播放下一首
    nextMusic() {
        if (this.props.currentIndex === this.props.musicList.length - 1) {
            this.props.dispatch(musicActions.playMusicByIndex(0));
        } else {
            this.props.dispatch(musicActions.playMusicByIndex(this.props.currentIndex + 1));
        }
    }
    componentWillMount() {
        this.getLyricAjax(this.props.currentMusic.id);
    }
    changePlayProgress(event) {
        let left = event.changedTouches[0].clientX - this.refs.progressParent.offsetLeft - event.target.offsetWidth / 2;
        let maxLeft = this.refs.progressParent.offsetWidth;
        let minLeft = 0;
        if (left < minLeft) {
            left = minLeft;
        }
        if (left > maxLeft) {
            left = maxLeft;
        }
        this.props.changeCurrentTime(left / maxLeft * this.props.totalSeconds);
    }
    componentWillReceiveProps() {
        const _this=this;
        if (this.props.currentMusic.id !== this.state.oldSongId) {
            this.getLyricAjax(this.props.currentMusic.id);
            this.setState({
                oldSongId: this.props.currentMusic.id
            })
        }
        if(this.props.currentSeconds>this.state.oldCurrentSeconds){
            this.state.lyricArray.forEach((item,index)=>{
                if(Math.abs(item.seconds-_this.props.currentSeconds)<0.5){
                    _this.setState({
                        activeIndex:index
                    });
                    _this.refs.lyricList.scrollTop=(index-1)*0.8*parseFloat(document.getElementsByTagName("html")[0].style.fontSize);
                }
            });
        }
    }
    render() {
        return (
            <div className={this.props.isControlShow ? 'qqMusic-control show' : 'qqMusic-control'}>
                <div className="qqMusic-control-content">
                    <div className="qqMusic-control-top">
                        <img className="icon-control-down" src={require("../../assets/imgs/icon-control-down.png")} onClick={this.props.consoleSwitch} />
                        <p className="music-name">{this.props.currentMusic ? this.props.currentMusic.name : ''}</p>
                    </div>
                    <div className={this.props.isPlay ? "qqMusic-control-middle active" : "qqMusic-control-middle"}>
                        <Carousel autoplay={false}>
                            {
                                [
                                    (
                                        <div key="1" className="carousel-one">
                                            <p className="music-signer">{this.props.currentMusic.ar ? this.props.currentMusic.ar[0].name : ''}</p>
                                            <img className="music-cover" src={this.props.currentMusic.al ? this.props.currentMusic.al.picUrl : ''} />
                                        </div>

                                    ),
                                    (
                                        <div key="2" className="carousel-two">
                                            <ul ref="lyricList"  className="lyricList">
                                                {
                                                    this.state.lyricArray.map((item, index) => {
                                                        return (
                                                            <li className={this.state.activeIndex===index?"lyric active":"lyric"} key={index}>{item.text}</li>
                                                        )
                                                    })
                                                }
                                            </ul>

                                        </div>
                                    )
                                ]
                            }
                        </Carousel>

                    </div>
                    <div className="qqMusic-control-bottom">
                        <div className="qqMusic-control-progress">
                            <span className="currentPlayTime">{util.formatSeconds(this.props.currentSeconds)}</span>
                            <div ref="progressParent" className="progress-wrapper">
                                <div className="progress-inner" style={{ width: this.props.currentSeconds / this.props.totalSeconds * 4 + "rem" }}></div>
                                <span className="progress-btn" onTouchMove={this.changePlayProgress.bind(this)} style={{ transform: `translateX(${this.props.currentSeconds / this.props.totalSeconds * 4 - 0.15}rem)` }}></span>
                            </div>
                            <span className="totalPlayTime">{util.formatSeconds(this.props.totalSeconds)}</span>
                        </div>
                        <div className="qqMusic-control-btns">
                            <img className="prev" src={require("../../assets/imgs/icon-music-prev.png")} onClick={this.prevMusic.bind(this)} />
                            <img className="status" src={this.props.isPlay ? require("../../assets/imgs/icon-control-pause.png") : require("../../assets/imgs/icon-control-play.png")} onClick={this.props.changePlayState} />
                            <img className="next" src={require("../../assets/imgs/icon-music-next.png")} onClick={this.nextMusic.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="qqMusic-control-bg" style={{ backgroundImage: `url(${this.props.currentMusic.al ? this.props.currentMusic.al.picUrl : ''}` }}></div>
                <div className="qqMusic-control-bg-mask"></div>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            currentMusic: state.music.currentMusic,
            currentIndex: state.music.currentIndex,
            musicList: state.music.musicList,
            isPlay: state.music.isPlay
        }
    }
)(Control);