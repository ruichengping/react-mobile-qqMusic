import React from 'react';
import arrowLeft from '../../assets/imgs/icon-arrow-left.png';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import * as musicActions from '../../actions/music.js';
import { connect } from 'react-redux';
import './Search.scss';
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            songList: [],
            pageNo: 1,
            totalCount: 0,
            isCanGet: true,
            isSearch:true
        }
    }
    comeback() {
        document.getElementsByClassName('input-text')[0].value = '';
        this.setState({
            songList:[]
        });
        this.props.searchChange.bind(this)();
    }
    //监听键盘事件
    keyboardListener(event){
        if(event.keyCode===13){
            this.getSearhListAjax();
        }
    }
    //搜索数据
    getSearhListAjax(event) {
        let _this = this;
        let searchText = document.getElementsByClassName('input-text')[0].value;
        let isSearch=this.state.isSearch;
        let offset = (this.state.pageNo - 1) * 20;
        if(this.state.isCanGet){
            _this.setState({
                isCanGet:false
            });
            if(this.state.isSearch){
                _this.setState({
                    songList:[]
                });
            }
            axios.get(`https://api.imjad.cn/cloudmusic/?type=search&offset=${offset}&s=${searchText}`).then((response) => {
                _this.setState({
                    isCanGet: true,
                    totalCount: response.data.result.songCount,
                    songList: isSearch?response.data.result.songs:_this.state.songList.concat(response.data.result.songs),
                    isSearch:true
                });
                
            }).catch(function (error) {
                _this.setState({
                    isCanGet: true,
                });
                console.log(error);
            });
        }
        
    }
    //下拉加载
    getMoreSearchList(event) {
        var scrollHeight = event.target.scrollHeight;
        var scrollTop = event.target.scrollTop;
        var clientHeight = event.target.clientHeight;
        if (scrollHeight - scrollTop - clientHeight < 10) {
            if (this.state.totalCount > this.state.songList.length) {
                if (this.state.isCanGet) {
                    this.setState({
                        pageNo: this.state.pageNo + 1,
                        isSearch:false
                    },function(){
                        this.getSearhListAjax();                        
                    });
                }
            }
        }
    }
    //往播放列表中添加音乐
    addMusic(musicItem) {
        this.props.dispatch(musicActions.addMusic(musicItem));
        this.comeback();
    }   

    render() {
        const _this=this;
        return (
            <div className={this.props.search ? 'qqMusic-search-wrapper show' : 'qqMusic-search-wrapper'} >
                <div className="qqMusic-search-top">
                    <img ref='inputText' className="icon-arrow-left" src={arrowLeft} onClick={this.comeback.bind(this)} />
                    <input className="input-text" type="text" placeholder="支持音乐搜索" onKeyUp={this.keyboardListener.bind(this)} />
                    <button className="btn-search" onClick={this.getSearhListAjax.bind(this)}>搜索</button>
                </div>
                <div className="qqMusic-search-bottom" onScroll={this.getMoreSearchList.bind(this)}>
                    <ul className="qqMusic-searchList">
                        {
                            this.state.songList.map(function (item, index) {
                                return (
                                    <li className="qqMusic-searchList-item border-bottom" key={index} onClick={_this.addMusic.bind(_this,item)}>
                                        <h4 className="qqMusic-searchList-item-title">{item.name}</h4>
                                        <p className="qqMusic-searchList-item-singer">{item.ar[0].name}</p>
                                        <p className="qqMusic-searchList-item-intro">{item.alia}</p>
                                    </li>
                                )
                            })
                        }
                        <li className="hint" style={this.state.isCanGet ? { display: 'none' } : {}}>正在加载更多...</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default connect()(Search);