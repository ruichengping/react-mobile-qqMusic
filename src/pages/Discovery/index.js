import React from 'react';
import './style.scss';
class Discovery extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        const discoveryListOne = [
            {
                text: '乐见大牌：GAI说唱惊喜轰炸，PGON爆理想型',
                music: '天干物燥-GAI',
                image: '/static/images/news-cover-one.jpeg',
                author: '乐见大牌',
                read: 3820
            },
            {
                text: '有些男女之情，比爱情更让人羡慕',
                music: '富士山下-陈奕迅',
                image: '/static/images/news-cover-two.jpg',
                author: '淘漉音乐',
                read: 8230
            },
            {
                text: '评论志|最怕回忆突然锋利，翻滚不息',
                music: '突然好想你-五月天',
                image: '/static/images/news-cover-three.jpg',
                author: '大冲音像店',
                read: 5761
            }
        ];
        const discoveryListTwo = [
            {
                text: 'S.H.E：十年女团，十年回忆',
                music: 'S.H.E | 十年女团，十年回忆-微音',
                image: '/static/images/discovery-she.jpg',
                author: '微音',
                read: 3555
            },
            {
                text: '张韶涵：好久不见，回来就好',
                music: '复仇时刻-张韶涵/我是赞助商派来的',
                image: '/static/images/discovery-zhangshaohan.jpeg',
                author: '淘漉音乐',
                read: 4223
            },
            {
                text: 'LOL背景音乐集锦：电子盛宴，自带BUFF',
                music: 'Time Leaper-Hinkik',
                image: '/static/images/discovery-ali.jpeg',
                author: '醉心琳琅',
                read: 9405
            }
        ];
        const topicList = [
            {
                image: '/static/images/topic-lizongsheng.jpeg',
                title: '#又见·李宗盛',
                text: '戳到了心坎的一句歌词'
            },
            {
                image: '/static/images/topic-linyoujia.jpg',
                title: '#又见·林宥嘉',
                text: '曾在哪首歌里泪流不止？'
            },
            {
                image: '/static/images/topic-chenyixun.jpeg',
                title: '#又见·陈奕迅',
                text: '循环播放最多次的一首歌'
            },
            {
                image: '/static/images/topic-tianfuzhen.jpeg',
                title: '#又见·田馥甄',
                text: '因为哪首歌爱上她的？'
            }
        ];
        return (
            <div className="qqMusic-home-body">
                <ul className="qqMusic-discovery-list">
                    {
                        discoveryListOne.map(function (item,index) {
                            return (
                                <li className="qqMusic-discovery-item" key={index}>
                                    <div className="qqMusic-discovery-item-left">
                                        <p className="text">{item.text}</p>
                                        <p className="music"><img className="music-image" src={require('@/assets/icon-music-black.png')} />{item.music}</p>
                                        <p className="extra">{item.author} 阅读 {item.read}</p>
                                    </div>
                                    <div className="qqMusic-discovery-item-right">
                                        <img className="image" src={item.image} />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="qqMusic-discovery-carousel">
                    <div className="top"><span className="tag">发现·话题</span></div>
                    <div className="bottom">
                        <ul className="list">
                            {
                                topicList.map(function (item,index) {
                                    return (
                                        <li className="item" key={index}>
                                            <img className="image" src={item.image} />
                                            <div className="mask">
                                                <h4 className="title">{item.title}</h4>
                                                <p className="text">{item.text}</p>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <ul className="qqMusic-discovery-list" style={{marginBottom:'0.3rem'}}>
                    {
                        discoveryListTwo.map(function (item,index) {
                            return (
                                <li className="qqMusic-discovery-item" key={index}>
                                    <div className="qqMusic-discovery-item-left">
                                        <p className="text">{item.text}</p>
                                        <p className="music"><img className="music-image" src={require('@/assets/icon-music-black.png')} />{item.music}</p>
                                        <p className="extra">{item.author} 阅读 {item.read}</p>
                                    </div>
                                    <div className="qqMusic-discovery-item-right">
                                        <img className="image" src={item.image} />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default Discovery;