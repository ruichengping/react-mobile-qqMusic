import React from 'react';
import {List,Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import './Slider.scss';
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            wifi:false,
            timingClose:true
        }
    }
    switchChange(type,checked){
        console.log(type+":"+checked);
    }
    render() {
        let SwitchExample = (props) => {
            const { getFieldProps } = props.form;
            return (
                <Switch className='qqMusic-slider-body-item-extra' platform='ios' type={props.type}
                {...getFieldProps('Switch',{
                  initialValue: false,
                  valuePropName: 'checked',
                })}    
                onClick={(checked) => { this.switchChange(props.type,checked); }}          
              />
            )
        };
        SwitchExample = createForm()(SwitchExample);
        const headerSliderList = [
            {
                imgSrc: require('../../assets/imgs/icon-slider-message.png'),
                title: '升级为VIP',
                text: '畅享音乐特权'
            },
            {
                imgSrc: require('../../assets/imgs/icon-slider-skin.png'),
                title: '个性化中心',
                text: '默认主题'
            },
            {
                imgSrc: require('../../assets/imgs/icon-slider-vip.png'),
                title: '消息中心',
                text: ''
            }
        ];
        const bodySliderList = [
            {
                text:'仅Wi-Fi联网',
                extra:<SwitchExample type={'仅Wi-Fi联网'}/>
            },
            {
                text:'定时关闭',
                extra:<SwitchExample type={'定时关闭'}/>
            },
            {
                text:'免流量服务',
                extra:null
            },
            {
                text:'微云音乐网盘',
                extra:null                
            },
            {
                text:'传歌到手机',
                extra:null                
            },
            {
                text:'QPlay与车载音乐',
                extra:null                
            },
            {
                text:'清理占用空间',
                extra:null                
            },
            {
                text:'免费WIFI',
                extra:null                
            },
            {
                text:'帮助与反馈',
                extra:null                
            },
            {
                text:'关于QQ音乐',
                extra:null                
            }
        ];
        return (
            <div>
                <div className={this.props.docked ? 'qqMusic-slider open' : 'qqMusic-slider'}>
                    <div className="qqMusic-slider-header border-bottom">
                        {
                            headerSliderList.map(function (item, index) {
                                return (
                                    <div className="qqMusic-slider-header-Item" key={index}>
                                        <img className="qqMusic-slider-header-Item-img" src={item.imgSrc} />
                                        <h4 className="qqMusic-slider-header-Item-title">{item.title}</h4>
                                        <p className="qqMusic-slider-header-Item-text">{item.text}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ul className="qqMusic-slider-body">
                        {
                            bodySliderList.map(function (item, index) {
                                return (
                                    <li className='qqMusic-slider-body-item' key={index}>
                                        <font className='qqMusic-slider-body-item-text'>{item.text}</font>{item.extra}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="qqMusic-slider-footer border-top">
                        <div className="qqMusic-slider-footer-left">
                            <i className="qqMusic-slider-footer-icon"></i>
                            <span className="qqMusic-slider-footer-text">设置</span>
                        </div>
                        <div className="qqMusic-slider-footer-right">
                            <i className="qqMusic-slider-footer-icon"></i>
                            <span className="qqMusic-slider-footer-text">退出登录/关闭</span>
                        </div>
                    </div>
                </div>
                <div className={this.props.docked ? 'qqMusic-slider-bg open' : 'qqMusic-slider-bg'} onTouchStart={this.props.openChange}></div>
            </div>
        )
    }
}

export default Slider;
