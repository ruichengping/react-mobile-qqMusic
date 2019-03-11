import React from 'react';
import { Carousel, Grid } from 'antd-mobile';
import './style.scss';
class MusicClub extends React.Component {
    render() {
        const imgList = [
            "/static/images/carousel-cover-one.jpg",
            "/static/images/carousel-cover-two.jpg",
            "/static/images/carousel-cover-three.jpg",
            "/static/images/carousel-cover-four.jpg",
            "/static/images/carousel-cover-five.jpg",
            "/static/images/carousel-cover-six.jpg",
            "/static/images/carousel-cover-seven.jpg",
            "/static/images/carousel-cover-eight.jpg"
        ];
        const menuList = [
            {
                icon: require('@/assets/icon-grid-singer.png'),
                text: '歌手'
            },
            {
                icon: require('@/assets/icon-grid-rank.png'),
                text: '排行'
            },
            {
                icon: require('@/assets/icon-grid-radio.png'),
                text: '电台'
            },
            {
                icon: require('@/assets/icon-grid-categories.png'),
                text: '分类歌单'
            },
            {
                icon: require('@/assets/icon-grid-video.png'),
                text: '视频MV'
            },
            {
                icon: require('@/assets/icon-grid-album.png'),
                text: '数字专辑'
            },
        ];

        const songMenuArray = [
            {
                image: '/static/images/songmenu-one.jpeg',
                text: '浮游时光 | 品一杯慢情调的韩系布鲁斯',
                amount: '15.7万'
            },
            {
                image: '/static/images/songmenu-two.jpeg',
                text: '达人周末 | 那些能激起中二病的动漫燃曲',
                amount: '65.7万'
            },
            {
                image: '/static/images/songmenu-three.jpeg',
                text: '99位唱见歌手 ：一人一首代表曲',
                amount: '272.2万'
            },
            {
                image: '/static/images/songmenu-four.jpeg',
                text: '独立民谣 | 从大不列颠群岛吹来怡然清风',
                amount: '39.5万'
            },
            {
                image: '/static/images/songmenu-five.jpeg',
                text: '《王者荣耀》风骚走位必备BGM',
                amount: '1319.1万'
            },
            {
                image: '/static/images/songmenu-six.jpeg',
                text: '你一定听过却死活叫不上歌名的灵魂级配乐',
                amount: '162.5万'
            }
        ]
        return (
            <div className="qqmusic-home-body">
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
                    className="qqmusic-grid-list"
                    data={menuList}
                    columnNum={3}
                    hasLine={false}
                    renderItem={
                        dataItem => (
                            <div className="qqmusic-grid-item">
                                <img className="qqmusic-grid-item-icon" src={dataItem.icon} />
                                <span className="qqmusic-grid-item-text" >{dataItem.text}</span>
                            </div>
                        )
                    }
                />
                <div className="qqmusic-songMenu-recommend">
                    <p className="title">歌单推荐<i className="icon-circle-right"></i></p>
                    <Grid
                        className="qqmusic-recommend-list"
                        data={songMenuArray}
                        columnNum={3}
                        hasLine={false}
                        renderItem={
                            (dataItem, index) => {
                                return (
                                    <div className="qqmusic-recommend-item" style={{marginLeft:index%3===1?'0.06rem':'',marginRight:index%3===1?'0.06rem':''}}>
                                        <div className="qqmusic-recommend-item-image-wrapper">
                                            <img className="image" src={dataItem.image} />
                                            <span className="amount">{dataItem.amount}</span>
                                            <img className="link-to-musicList-detail" src={require('@/assets/icon-music-link.png')}/>
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