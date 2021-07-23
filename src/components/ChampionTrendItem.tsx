import React from "react";
import styled from "styled-components";
import ChampionTierEQUAL from "../assets/icon-championtier-stay.png";
import Champion32 from "../assets/champion32.png";
import ChampionTrendHeader from "./ChampionTrendHeader";
import classnames from "classnames";
import tierUP from "../assets/icon-championtier-up.png";
import tierDown from "../assets/icon-championtier-down.png";
import tierStay from "../assets/icon-championtier-stay.png";
import { prototype } from "stream";


interface ChampionTrendItemProps {
    championID: number;
    change: number;
    position: string[];
    name:string;
    win: string;
    pick: string;
    tier: string;
    rank : string;
    trendType : string;
    banRate : string;
}

const ChampionTrendItemWrapper = styled(ChampionTrendHeader)`
    background-color: white;
    border:1px solid #e9eff4;

    &:not(:last-child){
        border-bottom:none;
    }

    & > .rank {
        font-style: italic;
        font-size: 20px;
    }

    & > .champ {
        display: flex;
        align-items: center;
        text-align: left;

        & > .change {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 14px;
            padding: 0 10px;
            width:50px;
            box-sizing:border-box;

            & > img {
                margin-right: 2px;
            }

            &.up{
                color:green;
            }

            &.down{
                color:red;
            }
        }

        & > .champ-img {
            width: 32px;
            height: 32px;
            background-image: url(${Champion32});
        }

        & > .champ-desc {
            font-size: 12px;
            margin-left: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            & > :first-child {
                font-weight: bold;
            }
        }
    }
`

const ChampionTrendItem: React.FC<ChampionTrendItemProps> = (props) => {
    
    const getTierChangeIcon = () => {
        if(props.change > 0 ) {
            return tierUP;

        }else if(props.change < 0) {
            return tierDown;

        }else{
            return tierStay;
        }
    }

    return(
         <ChampionTrendItemWrapper>
             {/* tier,winratio,pickratio,banratio   ||       */}
             {/* hidden={this.state.trendType === "banratio"} */}
            <div className="rank">{props.rank}</div>
            <div className="champ">
                <div className={classnames("change",{up:props.change > 0, down:props.change<0})}>
                    <img hidden={props.trendType !== "tier"} src={getTierChangeIcon()} alt=""/>
                    <div hidden={props.trendType !== "tier"}>{Math.abs(props.change)}</div>
                </div>
                <div className={`champ-img __spc32-${props.championID}`}>

                </div>
                <div className="champ-desc">
                    <div>{props.name}</div>
                    <div>{props.position}</div>
                </div>
            </div>
   
                <div className="win" hidden={props.trendType ==="banratio"|| props.trendType === "pickratio"} style={{color:"#4A90E2"}}>{props.win}</div>
                <div className="pick" hidden={props.trendType ==="banratio"|| props.trendType === "pickratio"}>{props.pick}</div>
        
        
                <div className="pick" hidden={props.trendType ==="banratio"|| props.trendType !== "pickratio"  } >{props.pick}</div>
                <div className="win" hidden={props.trendType ==="banratio"|| props.trendType !== "pickratio"  } style={{color:"#4A90E2"}}>{props.win}</div>
     

            <div className="tier" hidden={props.trendType !== "tier"}>
                <img src={props.tier} alt=""/>
            </div>
            <div hidden={props.trendType !=="banratio"}style={{color:"#4A90E2"}}>{props.banRate}</div>
        </ChampionTrendItemWrapper>
         
    )
}

export default ChampionTrendItem;