import React from 'react';
import './Discovery.scss';
class Discovery extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        const discoveryListOne = [
            {
                text: '乐见大牌：GAI说唱惊喜轰炸，PGON爆理想型',
                music: '天干物燥-GAI',
                image: '//y.gtimg.cn/music/photo_new/T001R300x300M000002J2k3z0OSYUL.jpg?max_age=2592000',
                author: '乐见大牌',
                read: 3820
            },
            {
                text: '有些男女之情，比爱情更让人羡慕',
                music: '富士山下-陈奕迅',
                image: 'http://img3.imgtn.bdimg.com/it/u=721809344,3372282991&fm=27&gp=0.jpg',
                author: '淘漉音乐',
                read: 8230
            },
            {
                text: '评论志|最怕回忆突然锋利，翻滚不息',
                music: '突然好想你-五月天',
                image: 'http://img4.imgtn.bdimg.com/it/u=732824453,2034850115&fm=27&gp=0.jpg',
                author: '大冲音像店',
                read: 5761
            }
        ];
        const discoveryListTwo = [
            {
                text: 'S.H.E：十年女团，十年回忆',
                music: 'S.H.E | 十年女团，十年回忆-微音',
                image: 'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c75c10385343fbf2440dfe26b07eca8065388f96.jpg',
                author: '微音',
                read: 3555
            },
            {
                text: '张韶涵：好久不见，回来就好',
                music: '复仇时刻-张韶涵/我是赞助商派来的',
                image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505506617222&di=091d88d53716c19f0ab8b79af9723803&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fbaike%2Fpic%2Fitem%2F08f790529822720e24cbda5971cb0a46f21fab0f.jpg',
                author: '淘漉音乐',
                read: 4223
            },
            {
                text: 'LOL背景音乐集锦：电子盛宴，自带BUFF',
                music: 'Time Leaper-Hinkik',
                image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505506773563&di=c1ba4670aacd88be973055d8dfdff892&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dd2fb8191a5cc7cd9fa783cdd0c310d09%2F09fa513d269759ee4339fab7b4fb43166d22df65.jpg',
                author: '醉心琳琅',
                read: 9405
            }
        ];
        const topicList = [
            {
                image: 'http://www.jgospel.net/media/106634/.120307.bt.jpg',
                title: '#又见·李宗盛',
                text: '戳到了心坎的一句歌词'
            },
            {
                image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3075202773,769084754&fm=27&gp=0.jpg',
                title: '#又见·林宥嘉',
                text: '曾在哪首歌里泪流不止？'
            },
            {
                image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505504724966&di=31d18b131aca416f6ab252542a3fe2b8&imgtype=0&src=http%3A%2F%2Fimgbdb3.bendibao.com%2Fweixinbdb%2F20178%2F9%2F20178912834105.jpg',
                title: '#又见·陈奕迅',
                text: '循环播放最多次的一首歌'
            },
            {
                image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505504804968&di=d9b9fbccb04be3bd0051c944e2841a86&imgtype=0&src=http%3A%2F%2Fecho-mx.b0.upaiyun.com%2F1770756431.jpg',
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
                                        <p className="music"><img className="music-image" src={require('../../assets/imgs/icon-music-black.png')} />{item.music}</p>
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
                                        <p className="music"><img className="music-image" src={require('../../assets/imgs/icon-music-black.png')} />{item.music}</p>
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