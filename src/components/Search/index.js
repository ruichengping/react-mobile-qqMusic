import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Toast } from 'antd-mobile';
import * as actions from '@/store/actions';
import { API } from '@/api';



import './style.scss';
@connect(
    (state)=>state.global,
    (dispatch)=>bindActionCreators(actions,dispatch)
)
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recordList: [],
            songList: [],
            pageNo: 1,
            totalCount: 0,
            isCanGet: true,
            isSearch: true,
            isRemindDivShow:true
        }
    }
    comeback() {
        document.getElementsByClassName('input-text')[0].value = '';
        this.setState({
            songList: [],
            pageNo: 1,
            totalCount: 0,
            isRemindDivShow:true
        });
        this.props.searchChange.bind(this)();
    }
    //监听键盘事件
    keyboardListener(event) {
        if (event.keyCode === 13) {
            this.setState({
                isRemindDivShow:false
            });
            this.addSearchRecord(document.getElementsByClassName('input-text')[0].value);
            this.getSearhListAjax();
        }
    }
    //搜索数据
    getSearhListAjax(event) {
        this.setState({
            isRemindDivShow:false
        });
        this.addSearchRecord(document.getElementsByClassName('input-text')[0].value);
        let searchText = document.getElementsByClassName('input-text')[0].value;
        let isSearch = this.state.isSearch;
        let offset = this.state.pageNo * 20;
        if (this.state.isCanGet) {
            this.setState({
                isCanGet: false,
            });
            if (this.state.isSearch) {
                this.setState({
                    songList: []
                });
            }
            API.queryMusic({
                nu:offset,
                id:searchText
            }).then((response)=>{
                const {Code,Body,songnum} = response;
                if(Code==='OK'){
                    this.setState({
                        isCanGet: true,
                        totalCount: songnum,
                        songList: isSearch ? Body : this.state.songList.concat(Body),
                        isSearch: true
                    }); 
                }else{
                    Toast.fail('查询失败');
                }
               
            })
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
                        isSearch: false
                    }, function () {
                        this.getSearhListAjax();
                    });
                }
            }
        }
    }
    clearInput() {
        document.getElementsByClassName('input-text')[0].value = '';
        this.setState({
            songList: [],
            pageNo: 1,
            totalCount: 0,
            isRemindDivShow:true
        });
    }
    //快捷搜索
    fastSearch(searchText){
        document.getElementsByClassName('input-text')[0].value = searchText;
        this.setState({
            isRemindDivShow:false
        });
        this.addSearchRecord(searchText);
        this.getSearhListAjax();
    }
    //添加搜索记录
    addSearchRecord(recordStr) {
        let recordList=this.state.recordList;        
        const isCanAdd = !recordList.some((item) => {
            return item === recordStr;
        });
        if (isCanAdd&&recordStr!=='') { 
            recordList.unshift(recordStr);
        }
        this.setState({
            recordList
        });
        localStorage["yqq_search_history"] = this.state.recordList.join(",");
    }
    //移除记录
    removeRecord(record) {
        const recordList = this.state.recordList.filter((item) => {
            return record !== item;
        });
        this.setState({
            recordList
        });
        localStorage["yqq_search_history"] = recordList.join(",");        
    }
    //清楚历史记录
    clearRecord(){
        localStorage["yqq_search_history"]="";
        this.setState({
            recordList:[]
        });
    }
    //往播放列表中添加音乐
    addMusic(musicItem) {
        const {addAndChangeMusic} = this.props;
        addAndChangeMusic(musicItem,true);
        this.comeback();
    }
    componentDidMount() {
        if (localStorage["yqq_search_history"]) {
            this.setState({
                recordList: localStorage["yqq_search_history"].split(",")
            });
        }

    }
    render() {
        const {songList,isCanGet,recordList,isRemindDivShow} = this.state;
        const {search} = this.props;
        const searchTextList=["邓紫棋","全孝盛","张靓颖","周杰伦","薛之谦","林俊杰"]
        return (
            <div className={search ? 'qqMusic-search-wrapper show' : 'qqMusic-search-wrapper'} >
                <div className="qqMusic-search-top">
                    <img ref='inputText' className="icon-arrow-left" src={require("@/assets/icon-arrow-left.png")} onClick={this.comeback.bind(this)} />
                    <input className="input-text" type="text" placeholder="支持音乐搜索" onKeyUp={this.keyboardListener.bind(this)} />
                    <span className="icon-input-clear" onClick={this.clearInput.bind(this)}></span>
                    <span className="btn-search" onClick={this.getSearhListAjax.bind(this)}>搜索</span>
                </div>
                <div className="qqMusic-search-bottom" onScroll={this.getMoreSearchList.bind(this)}>
                    <div className="remindMask" style={{display:isRemindDivShow?'block':'none'}}>
                        <div className="search-text-list-wrapper">
                            <h4 className="title-hot-search">热门搜索</h4>
                            <ul className="search-text-list">
                                {
                                    searchTextList.map((item,index)=>{
                                        return (
                                            <li className="search-text-item" onClick={this.fastSearch.bind(this,item)} key={index}>{item}</li>                                            
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <h4 style={{display:recordList.length>0?'block':'none'}} className="title-search-history border-bottom">搜索历史<span className="cleanRecord" onClick={this.clearRecord.bind(this)}>清空历史</span></h4>
                        <ul className="recordList">
                            {
                                recordList.map((item,index) => {
                                    return (
                                        <li className="recordItem border-bottom" key={index}>
                                            <span className="icon-recent"></span>
                                            <p onClick={this.fastSearch.bind(this,item)}>{item}</p>
                                            <span className="icon-close" onClick={this.removeRecord.bind(this, item)}></span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <ul className="qqMusic-searchList">
                        {
                            songList.map((item, index) => {
                                return (
                                    <li className="qqMusic-searchList-item border-bottom" key={index} onClick={this.addMusic.bind(this, item)}>
                                        <div className="left">
                                            <h4 className="title">{item.title}</h4>
                                            <p className="singer">{item.author}</p>
                                            <p className="intro">{item.album}</p>
                                        </div>
                                        <div className="right">
                                            <img className="cover" alt={item.album} src={item.pic}/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        <li className="hint" style={isCanGet ? { display: 'none' } : {}}>正在加载更多...</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Search;