import React from 'react';
import { Grid } from 'antd-mobile';
import './style.scss';
import auditionImg from '@/assets/icon-user-audition.png';
import dredgeImg from '@/assets/icon-user-dredge.png';
import rankImg from '@/assets/icon-user-rank.png';
import SongMenu from '@/components/SongMenu';
class mycenter extends React.Component {
    render() {
        const girdList = [
            {
                text: '本地歌曲',
                imgSrc: require('@/assets/icon-grid-music.png')
            },
            {
                text: '下载歌曲',
                imgSrc: require('@/assets/icon-grid-download.png')
            },
            {
                text: '最近播放',
                imgSrc: require('@/assets/icon-grid-recent.png')
            },
            {
                text: '我喜欢',
                imgSrc: require('@/assets/icon-grid-favorite.png')
            },
            {
                text: '下载MV',
                imgSrc: require('@/assets/icon-grid-mv.png')
            },
            {
                text: '已购音乐',
                imgSrc: require('@/assets/icon-grid-buy.png')
            }
        ]
        return (
            <div className="qqmusic-home-body">
                <div className="qqmusic-mycenter-top">
                    <div className="qqmusic-mycenter-user">
                        <div className="qqmusic-mycenter-user-module">
                            <div className="qqmusic-mycenter-user-audition">
                                <img className="icon" src={auditionImg} />
                                <span className="text">0分钟</span>
                            </div>
                            <img className="qqmusic-mycenter-user-photo" src="https://wx.qlogo.cn/mmopen/LHU7CmulIEWaZgu4PRWXOScvVCC5npYoPvBFVLMXldibtQ1BRVMJy4RaHXliabaqJSazgI8QTuF9g2X7l9iafOvfX27vcHl2ksA/0" />
                            <div className="qqmusic-mycenter-user-dredge">
                                <img className="icon" src={dredgeImg} />
                                <span className="text">开通</span>
                            </div>
                        </div>
                        <div className="qqmusic-mycenter-user-module">
                            <span className="userName">椰子油</span>
                        </div>
                        <div className="qqmusic-mycenter-user-module">
                            <img className="qqmusic-mycenter-user-rank" src={rankImg} />
                        </div>
                    </div>
                    <Grid
                        className="qqmusic-mycenter-grid"
                        data={girdList}
                        columnNum={3}
                        hasLine={false}
                        renderItem={
                            item => (
                                <div className="qqmusic-mycenter-grid-item">
                                    <img className="image" src={item.imgSrc} />
                                    <p className="text">{item.text}</p>
                                </div>
                            )
                        }
                    />
                    <div className="qqmusic-mycenter-middle">
                        <div className="qqmusic-mycenter-station">
                            <div className="qqmusic-mycenter-station-left">
                                <img className="station-image" src="/static/images/broadcasting-station-specific.jpeg" />
                            </div>
                            <div className="qqmusic-mycenter-station-right">
                                <h4 className="station-title">个性电台</h4>
                                <p className="station-text">偶遇身边好音乐</p>
                            </div>
                        </div>
                        <div className="qqmusic-mycenter-station">
                            <div className="qqmusic-mycenter-station-left">
                                <img className="station-image" src="/static/images/broadcasting-station-run.jpeg" />
                            </div>
                            <div className="qqmusic-mycenter-station-right border-top">
                                <h4 className="station-title">跑步电台</h4>
                                <p className="station-text">QQ音乐 x Nike，让运动乐在其中</p>
                            </div>
                        </div>
                    </div>
                    <SongMenu />
                </div>
            </div>
        )
    }
}
export default mycenter;