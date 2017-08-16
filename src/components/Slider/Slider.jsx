import React from 'react';
import menuItemMessage from '../../assets/imgs/icon-menuItem-message.png';
import menuItemSkin from '../../assets/imgs/icon-menuItem-skin.png';
import menuItemVip from '../../assets/imgs/icon-menuItem-vip.png';
import './Slider.scss';
class Slider extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const headerMenuList = [
            {
                imgSrc: menuItemVip,
                title: '升级为VIP',
                text: '畅享音乐特权'
            },
            {
                imgSrc: menuItemSkin,
                title: '个性化中心',
                text: '默认主题'
            },
            {
                imgSrc: menuItemMessage,
                title: '消息中心',
                text: ''
            }
        ];
        return (
            <div>
                <div className={this.props.docked ? 'qqMusic-menu open' : 'qqMusic-menu'}>
                    <div className="qqMusic-menu-header">
                        {
                            headerMenuList.map(function (item, index) {
                                return (
                                    <div className="qqMusic-menu-header-Item" key={index}>
                                        <img className="qqMusic-menu-header-Item-img" src={item.imgSrc} />
                                        <h4 className="qqMusic-menu-header-Item-title">{item.title}</h4>
                                        <p className="qqMusic-menu-header-Item-text">{item.text}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className={this.props.docked ? 'qqMusic-menu-bg open' : 'qqMusic-menu-bg'} onTouchStart={this.props.openChange}></div>
            </div>
        )
    }
}

export default Slider;
