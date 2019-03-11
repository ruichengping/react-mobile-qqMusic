import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import { Carousel } from 'antd-mobile';
import * as actions from '@/store/actions';
import utils from '@/utils';
import './style.scss';
import { API } from '@/api';
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class Control extends React.Component {
    state={
        oldSongId:'',
        lyricArray: [],
        currentLyricIndex:0
    }
    static getDerivedStateFromProps(nextProps,prevState){
        const {lyricArray,currentLyricIndex} = prevState;
        const {currentSeconds} = nextProps;
        const newLyricIndex = lyricArray.findIndex((item)=>Math.abs(item.seconds-currentSeconds)<0.2);
        return {
            currentLyricIndex:newLyricIndex >-1?newLyricIndex:currentLyricIndex
        }
    }
    //播放上一首
    prevMusic=()=>{
        const {musicList,currentMusic={},playSpecificMusicByMid} = this.props;
        const currentIndex = musicList.findIndex((music)=>music.mid===currentMusic.mid);
        let nextMusic ;
        if (currentIndex > 0) {
            nextMusic = musicList[currentIndex - 1];
        } else {
            nextMusic = musicList[musicList.length-1];
        }
        playSpecificMusicByMid(nextMusic.mid);
    }
    //播放下一首
    nextMusic=()=>{
        const {musicList,currentMusic={},playSpecificMusicByMid} = this.props;
        const currentIndex = musicList.findIndex((music)=>music.mid===currentMusic.mid);
        let nextMusic ;
        if (currentIndex < musicList.length - 1) {
            nextMusic = musicList[currentIndex + 1];
        } else {
            nextMusic = musicList[0];
        }
        playSpecificMusicByMid(nextMusic.mid);

    }
    changePlayProgress=(event)=>{
        const {totalSeconds} = this.props;
        let left = event.changedTouches[0].clientX - this.refs.progressParent.offsetLeft - event.target.offsetWidth / 2;
        let maxLeft = this.refs.progressParent.offsetWidth;
        let minLeft = 0;
        if (left < minLeft) {
            left = minLeft;
        }
        if (left > maxLeft) {
            left = maxLeft;
        }
        this.props.changeCurrentTime(left / maxLeft * totalSeconds);
    }
    componentDidUpdate(){
        const {currentMusic={}} = this.props;
        const {oldSongId,currentLyricIndex} =this.state;
        const {mid} = currentMusic;
        if(mid&&oldSongId!==mid){
            API.getMusicLyric({
                id:mid
            }).then((response)=>{
                this.setState({
                    oldSongId:mid,
                    lyricArray:response.split('\n').map((item)=>{
                        const matchTimestamp = item.match(/\[.+\]/)[0];
                        return {
                            seconds:isNaN(utils.parseStrToSeconds(matchTimestamp))?0:utils.parseStrToSeconds(matchTimestamp),
                            text:item.split('').filter((char)=>matchTimestamp.indexOf(char)<0).join('')
                        }
                    }).filter((item)=>item.text.length>0)
                });
            });
        }
        this.lyricDom.scrollTop=currentLyricIndex*40;
    }
    render() {
        const {lyricArray,currentLyricIndex} = this.state;
        const {currentMusic={},isPlay,changePlayState,currentSeconds,totalSeconds,isControlShow,consoleSwitch} = this.props;
        const {title,author,pic} = currentMusic;
        return (
            <div className={classnames('qqmusic-control',isControlShow ? 'show' : '')}>
                <div className="qqmusic-control-content">
                    <div className="qqmusic-control-top">
                        <img className="icon-control-down" src={require("@/assets/icon-control-down.png")} onClick={consoleSwitch} />
                        <p className="music-name">{title}</p>
                    </div>
                    <div className={classnames('qqmusic-control-middle',isPlay ? 'active' : '')}>
                        <Carousel autoplay={false}>
                            {
                                [
                                    (
                                        <div key="1" className="carousel-one">
                                            <p className="music-signer">{author}</p>
                                            <img className="music-cover" src={pic} />
                                        </div>

                                    ),
                                    (
                                        <div key="2" className="carousel-two" style={{scrollMarginTop:currentLyricIndex*40}}>
                                            <ul ref={(dom)=>this.lyricDom=dom}  className="lyricList">
                                                {
                                                    lyricArray.map((item, index) => {
                                                        return (
                                                            <li className={currentLyricIndex===index?"lyric active":"lyric"} key={index}>{item.text}</li>
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
                    <div className="qqmusic-control-bottom">
                        <div className="qqmusic-control-progress">
                            <span className="currentPlayTime">{utils.formatSeconds(currentSeconds)}</span>
                            <div ref="progressParent" className="progress-wrapper">
                                <div className="progress-inner" style={{ width: currentSeconds / totalSeconds * 200 + "px" }}></div>
                                <span className="progress-btn" onTouchMove={this.changePlayProgress.bind(this)} style={{ transform: `translateX(${currentSeconds / totalSeconds * 200 - 7}px)` }}></span>
                            </div>
                            <span className="totalPlayTime">{utils.formatSeconds(totalSeconds)}</span>
                        </div>
                        <div className="qqmusic-control-btns">
                            <img className="prev" src={require("@/assets/icon-music-prev.png")} onClick={this.prevMusic} />
                            <img className="status" src={isPlay ? require("@/assets/icon-control-pause.png") : require("@/assets/icon-control-play.png")} onClick={changePlayState} />
                            <img className="next" src={require("@/assets/icon-music-next.png")} onClick={this.nextMusic} />
                        </div>
                    </div>
                </div>
                <div className="qqmusic-control-bg" style={{ backgroundImage: `url(${pic}` }}></div>
                <div className="qqmusic-control-bg-mask"></div>
            </div>
        )
    }
}
export default Control;