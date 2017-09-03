import React from 'react';
import { Carousel, Grid } from 'antd-mobile';
import './MusicClub.scss';
class MusicClub extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const imgList = [
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/136996.jpg",
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/137001.jpg",
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/136837.jpg",
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/136785.jpg",
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/136105.jpg",
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/136190.jpg",
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/136903.jpg",
            "https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/118122.jpg"
        ];
        const menuList = [
            {
                icon: require('../../assets/imgs/icon-grid-singer.png'),
                text: '歌手'
            },
            {
                icon: require('../../assets/imgs/icon-grid-rank.png'),
                text: '排行'
            },
            {
                icon: require('../../assets/imgs/icon-grid-radio.png'),
                text: '电台'
            },
            {
                icon: require('../../assets/imgs/icon-grid-categories.png'),
                text: '分类歌单'
            },
            {
                icon: require('../../assets/imgs/icon-grid-video.png'),
                text: '视频MV'
            },
            {
                icon: require('../../assets/imgs/icon-grid-album.png'),
                text: '数字专辑'
            },
        ];

        const songListArray = [
            {
                image: 'https://p.qpic.cn/music_cover/yGMcxIOCOW5CtiaFibCDFHDKIYlA0Thy65BR0icuxmN5KicDhsXYZuRMTw/300?n=1',
                text: '浮游时光 | 品一杯慢情调的韩系布鲁斯',
                amount: '15.7万'
            },
            {
                image: 'https://p.qpic.cn/music_cover/ESQkDB4ohgibFpRT23xHVFf1NSibRu5MgFQVeviaYLfp6Q8SVY8dZ7q7g/300?n=1',
                text: '达人周末 | 那些能激起中二病的动漫燃曲',
                amount: '65.7万'
            },
            {
                image: 'https://p.qpic.cn/music_cover/qH8rLHHhL8O8Iibm56uPzJ9vpPJ9icaI58TuHk6jZia3oAPLqqXJ2zsLA/300?n=1',
                text: '99位唱见歌手 ：一人一首代表曲',
                amount: '272.2万'
            },
            {
                image: 'https://p.qpic.cn/music_cover/ibntviciboJuwCoCNK8ibZkjethpQNPJ9G0FJ7CySCPIHpibSuicJ0T2dcaw/300?n=1',
                text: '独立民谣 | 从大不列颠群岛吹来怡然清风',
                amount: '39.5万'
            },
            {
                image: 'https://p.qpic.cn/music_cover/tHzMbKzYyUqgJIqHZCoy9c9FBSaFxEgaX54iaDicSxG57C6veeibxSnAA/300?n=1',
                text: '《王者荣耀》风骚走位必备BGM',
                amount: '1319.1万'
            },
            {
                image: 'https://p.qpic.cn/music_cover/0XaJ7WwKJXDzVrtkNbdjrVSDgibZWAAVXJ8KrqMqvKa7gfsrDgTXIsA/300?n=1',
                text: '你一定听过却死活叫不上歌名的灵魂级配乐',
                amount: '162.5万'
            }
        ]
        return (
            <div className="qqMusic-home-body">
                <Carousel
                    className="slideshow-list"
                    infinite
                    autoplay={true}
                    autoplayInterval={2000}
                >
                    {imgList.map((item, index) => {
                        return (
                            <a key={index} className="slideshow-item-link" href="javascript:;">
                                <img className="slideshow-item-img" src={item} />
                            </a>
                        );
                    })
                    }
                </Carousel>
                <Grid
                    className="qqMusic-grid-list"
                    data={menuList}
                    columnNum={3}
                    hasLine={false}
                    renderItem={
                        dataItem => (
                            <div className="qqMusic-grid-item">
                                <img className="qqMusic-grid-item-icon" src={dataItem.icon} />
                                <span className="qqMusic-grid-item-text" >{dataItem.text}</span>
                            </div>
                        )
                    }
                />
                <div className="qqMusic-songList-recommend">
                    <p className="title">歌单推荐<i className="icon-circle-right"></i></p>
                    <Grid
                        className="qqMusic-recommend-list"
                        data={songListArray}
                        columnNum={3}
                        hasLine={false}
                        renderItem={
                            (dataItem, index) => {
                                return (
                                    <div className="qqMusic-recommend-item" style={{marginLeft:index%3===1?'0.06rem':'',marginRight:index%3===1?'0.06rem':''}}>
                                        <div className="qqMusic-recommend-item-image-wrapper">
                                            <img className="image" src={dataItem.image} />
                                            <span className="amount">{dataItem.amount}</span>
                                            <img className="link-to-musicList-detail" src={require('../../assets/imgs/icon-music-link.png')}/>
                                        </div>
                                        <p className="text" >{dataItem.text}</p>
                                    </div>
                                )
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}
export default MusicClub