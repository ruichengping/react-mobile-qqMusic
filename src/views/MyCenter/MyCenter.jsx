import React from 'react';
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import './MyCenter.scss';
import auditionImg from '../../assets/imgs/icon-user-audition.png';
import dredgeImg from '../../assets/imgs/icon-user-dredge.png';
import rankImg from '../../assets/imgs/icon-user-rank.png';
import gridMusic from '../../assets/imgs/icon-grid-music.png';
import gridMv from '../../assets/imgs/icon-grid-mv.png';
import gridDownload from '../../assets/imgs/icon-grid-download.png';
import gridFavorite from '../../assets/imgs/icon-grid-favorite.png';
import gridRecent from '../../assets/imgs/icon-grid-recent.png';
import gridBuy from '../../assets/imgs/icon-grid-buy.png';
import Songlist from '../../components/Songlist/Songlist';
class MyCenter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const girdList = [
            {
                text: '本地歌曲',
                imgSrc: gridMusic
            },
            {
                text: '下载歌曲',
                imgSrc: gridDownload
            },
            {
                text: '最近播放',
                imgSrc: gridRecent
            },
            {
                text: '我喜欢',
                imgSrc: gridFavorite
            },
            {
                text: '下载MV',
                imgSrc: gridMv
            },
            {
                text: '已购音乐',
                imgSrc: gridBuy
            }
        ]
        return (
            <div className="qqMusic-home-body">
                <div className="qqMusic-myCenter-top">
                    <div className="qqMusic-myCenter-user">
                        <div className="qqMusic-myCenter-user-module">
                            <div className="qqMusic-myCenter-user-audition">
                                <img className="icon" src={auditionImg} />
                                <span className="text">0分钟</span>
                            </div>
                            <img className="qqMusic-myCenter-user-photo" src="https://wx.qlogo.cn/mmopen/LHU7CmulIEWaZgu4PRWXOScvVCC5npYoPvBFVLMXldibtQ1BRVMJy4RaHXliabaqJSazgI8QTuF9g2X7l9iafOvfX27vcHl2ksA/0" />
                            <div className="qqMusic-myCenter-user-dredge">
                                <img className="icon" src={dredgeImg} />
                                <span className="text">开通</span>
                            </div>
                        </div>
                        <div className="qqMusic-myCenter-user-module">
                            <span className="userName">椰子油</span>
                        </div>
                        <div className="qqMusic-myCenter-user-module">
                            <img className="qqMusic-myCenter-user-rank" src={rankImg} />
                        </div>
                    </div>
                    <div className="qqMusic-myCenter-grid">
                        <div className="qqMusic-myCenter-grid-top">
                            {
                                girdList.map(function (item, index) {
                                    if (index < 3) {
                                        return (<div className="qqMusic-myCenter-grid-item" key={index}>
                                            <img className="image" src={item.imgSrc} />
                                            <p className="text">{item.text}</p>
                                        </div>)
                                    }
                                })
                            }
                        </div>
                        <div className="qqMusic-myCenter-grid-bottom">
                            {
                                girdList.map(function (item, index) {
                                    if (index > 2) {
                                        return (<div className="qqMusic-myCenter-grid-item" key={index}>
                                            <img className="image" src={item.imgSrc} />
                                            <p className="text">{item.text}</p>
                                        </div>)
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="qqMusic-myCenter-middle">
                    <div className="qqMusic-myCenter-station">
                        <div className="qqMusic-myCenter-station-left">
                            <img className="station-image"  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503314271645&di=6f742ae5ff0ba1e8c1669abbb21f2be6&imgtype=0&src=http%3A%2F%2Fsc.jb51.net%2Fuploads%2Fallimg%2F150408%2F14-15040Q100280-L.jpg"/>
                        </div>
                        <div className="qqMusic-myCenter-station-right">
                            <h4 className="station-title">个性电台</h4>
                            <p className="station-text">偶遇身边好音乐</p>
                        </div>
                    </div>
                    <div className="qqMusic-myCenter-station">
                        <div className="qqMusic-myCenter-station-left">
                            <img className="station-image"  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503314324399&di=611a4de0973b30af16f77bc1b4367ec2&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1506%2F03%2Fc38%2F7898935_1433313764312_1024x1024.jpg"/>
                        </div>
                        <div className="qqMusic-myCenter-station-right border-top">
                            <h4 className="station-title">跑步电台</h4>
                            <p className="station-text">QQ音乐 x Nike，让运动乐在其中</p>
                        </div>
                    </div>
                </div>
                <Songlist/>
            </div>
        )
    }
}
export default MyCenter