import axios from "axios";
import classNames from "classnames";
import React from "react";
import styled from "styled-components";
import Champion from "../components/Champion";
import ChampionModel from "../models/ChampionModel";
import ChampionImage from "../assets/icon-champion-n.png";
import ChampionTrendItem from "../components/ChampionTrendItem";
import ChampionTrendHeader from "../components/ChampionTrendHeader";
import ChampionTrendToolbar from "../components/ChampionTrendToolbar";
import ChampionTrendModel from '../models/ChampionTrendModel';

interface ChampionListProps{

}

interface ChampionListState{
    allChampions: ChampionModel[]
    champions: ChampionModel[]
    type: string
    text: string
    trendChampions : ChampionTrendModel[];
    
}

const ChampionListPageWrapper = styled.div`
    display: flex;
    width: 1080px;
    margin: 0 auto;
    margin-top: 100px;
`

// List of champion page
export default class ChampionsList extends React.Component<ChampionListProps, ChampionListState> {

    constructor(props: ChampionListProps){
        super(props);

        this.state = {
            allChampions: [],
            champions: [],
            type: "ALL",
            text: "",

            trendChampions:[],

        }
    }

    async componentDidMount(){
        const response = await axios.get("http://opgg.dudco.kr/champion");
        const allChampions = response.data.map((data: any) => 
            new ChampionModel({
                id: data.id, 
                name: data.name, 
                key: data.key, 
                position: data.position
            })
        );
        
        const responsrTrend = await axios.get("http://opgg.dudco.kr/champion/trend/tier/top")
        const trendChampions = responsrTrend.data.map((data: any)=>
        new ChampionTrendModel({
            id : data.id,
            rank : data.rank,
            change : data.change,
            name : data.name,
            position : data.position,
            winRate : data.winRate,
            pickRate : data.pickRate,
            benRate : data.benRate,
            tierIcon : data.tierIcon,
            
        }))
        console.log(trendChampions)
        this.setState({
            allChampions,
            champions: allChampions,
            trendChampions,
        });
    }

    onChangeType = (type: string) => () => {
        console.log("onChangeType");
        this.setState({
            type: type,
            champions: this.filterChampions(type),
        });
    }

    onChangeInput = (text: string) => {
        console.log("onChangeInput");
        this.setState({
            text: text,
            champions: this.searchChampion(text),
        });
    }

    filterChampions = (type: string) => {
        document.querySelectorAll("input")[1].value = ""; 
        switch(type){
            case "TOP": return this.state.allChampions.filter(c => c.position!!.indexOf("탑") > -1);
            case "JUG": return this.state.allChampions.filter(c => c.position!!.indexOf("정글") > -1);
            case "MID": return this.state.allChampions.filter(c => c.position!!.indexOf("미드") > -1);
            case "ADC": return this.state.allChampions.filter(c => c.position!!.indexOf("바텀") > -1);
            case "SUP": return this.state.allChampions.filter(c => c.position!!.indexOf("서포터") > -1);
            case "ROTE": return this.state.allChampions;
            default: return this.state.allChampions;
        }
    }

    searchChampion = (text: string) => {
        console.log("searchChampion");
        var temp;
        switch(this.state.type){
            case "TOP": temp = this.state.allChampions.filter(c => c.position!!.indexOf("탑") > -1); break;
            case "JUG": temp = this.state.allChampions.filter(c => c.position!!.indexOf("정글") > -1); break;
            case "MID": temp = this.state.allChampions.filter(c => c.position!!.indexOf("미드") > -1); break;
            case "ADC": temp = this.state.allChampions.filter(c => c.position!!.indexOf("바텀") > -1); break;
            case "SUP": temp = this.state.allChampions.filter(c => c.position!!.indexOf("서포터") > -1); break;
            case "ROTE": temp = this.state.allChampions; break;
            default: temp = this.state.allChampions; break;
        }
        if(text === ""){
            return temp;
        }
        return temp.filter(c => c.name!!.indexOf(text) > -1);
    }

    render() {
        return(
            <ChampionListPageWrapper>
                <ChampionsWrapper>
                    <div className="header">
                        <div className="item-wrap">
                            <div className={classNames("item", {select: this.state.type === "ALL"})} onClick={this.onChangeType("ALL")}>전체</div>
                            <div className={classNames("item", {select: this.state.type === "TOP"})} onClick={this.onChangeType("TOP")}>탑</div>
                            <div className={classNames("item", {select: this.state.type === "JUG"})} onClick={this.onChangeType("JUG")}>정글</div>
                            <div className={classNames("item", {select: this.state.type === "MID"})} onClick={this.onChangeType("MID")}>미드</div>
                            <div className={classNames("item", {select: this.state.type === "ADC"})} onClick={this.onChangeType("ADC")}>바텀</div>
                            <div className={classNames("item", {select: this.state.type === "SUP"})} onClick={this.onChangeType("SUP")}>서포터</div>
                            <div className={classNames("item rote", {select: this.state.type === "ROTE"})} onClick={this.onChangeType("ROTE")}>로테이션</div>
                        </div>
                        <input 
                            type = "text" 
                            placeholder = "챔피언 검색(가렌, ㄱㄹ, ...)"
                            onChange = {
                                (e) => {
                                    this.onChangeInput(e.target.value);
                                }
                            }
                        />
                    </div>
                    <div className="list">
                        {
                            this.state.champions.map((data) => 
                                <Champion
                                    key = {data.id}
                                    id = {Number(data.id) || 0}
                                    position = {data.position || []}
                                    name = {data.name || ""}
                                />
                            )
                            
                        }
                        {[1,2,3,4,5,6].map(() => <div style={{width: "82px", height: 0}}/>)}
                    </div>
                </ChampionsWrapper>
                <ChampionTrendWrapper>
                    <div className="trendHeader">
                        <div className="trendTitle">챔피언 순위</div>
                        <div className="trendItem-wrap">
                            <div className="trendItem select">
                                <img src={ChampionImage}/>
                                티어</div>
                            <div className="contour"></div>
                            <div className="trendItem">승률</div>
                            <div className="contour"></div>
                            <div className="trendItem">픽률</div>
                            <div className="contour"></div>
                            <div className="trendItem">밴률</div>
                        </div>
                    </div>
                    <div className="List">
                        <ChampionTrendToolbar>
                            <div hidden={true}>전체</div>
                            <div className="select">탑</div>
                            <div>정글</div>
                            <div>미드</div>
                            <div>바텀</div>
                            <div>서포터</div>
                        </ChampionTrendToolbar>
                        <ChampionTrendHeader>
                            <div>#</div>
                            <div>챔피언</div>
                            <div>승률</div>
                            <div>픽률</div>
                            <div>티어</div>
                        </ChampionTrendHeader>

                        {
                            this.state.trendChampions.map(c => <ChampionTrendItem
                            championID = {c.id}
                            change={c.change}
                            name={c.name}
                            position={c.position}
                            win={c.winRate}
                            pick={c.pickRate}
                            tier={c.tierIcon}
                            rank={c.rank}/>)
                        }
                        {/* <ChampionTrendItem/> */}
                    </div>
                </ChampionTrendWrapper>
            </ChampionListPageWrapper>
        )
    }
}

const ChampionsWrapper = styled.div`
    background-color: white;
    border-right: 1px solid #e9eff4;

    & > .header{
        display: flex;
        justify-content: space-between;
        padding: 0 17px;
        border-bottom: 1px solid #e9eff4;

        & > .item-wrap{
            display: flex;

            & > .item{
                line-height: 60px;
                padding: 0 10px;
                color: rgba(0, 0, 0, .6);
                cursor: pointer;
                font-size: 14px;

                &.select{
                    box-shadow: 0px -3px 0px 0px #5383e8 inset;
                    color: #5383e8;
                    font-weight: bold;
                }

                &.rote{
                    color: #5383e8;
                }
            }

        }

        & > input {
                width: 200px;
                margin: 10px 0;
                padding: 0 10px;
                border: none;
                background-color: #f7f7f7;
                font-size: 12px;
            }
    }

    & > .list{
        width: 564px;
        background-color: #f7f7f7;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 50px;
    }
`

const ChampionTrendWrapper = styled.div`
    flex: 1;   
    background-color: white;

    & > .trendHeader {
        display: flex;
        padding: 0 17px;
        border-bottom: 1px solid #e9eff4;
        justify-content: space-between;
        font-size: 14px;

        & > .trendTitle {
            line-height: 60px;
            font-weight: bold;
            color: #222;
        }

        & > .trendItem-wrap {
            display: flex;
            align-items: center;

            & > .select{
                box-shadow: 0px -3px 0px 0px #5383e8 inset;
                color: #5383e8;
                font-weight: bold;
            }

            & > .trendItem {
                line-height: 60px;
                padding: 0 5px;
                cursor: pointer;
            }
            
            & > .contour {
                margin: 0 5px;
                padding: 0 1px;
                display: flex;
                height: 14px;
                border-left: 1px solid #f2f3f5;
            }

            & > :first-child > img {
                margin-right: 3px;
            }
        }
    }

    & > .List {
        height: 100vh;
        background-color: #f7f7f7;
        padding: 20px;
    }
`