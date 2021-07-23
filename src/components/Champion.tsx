import React from "react";
import styled from "styled-components";
import championImage from "../assets/champion82.png";

const ChampionWrapper = styled.div`
    margin-top: 16px;

    & > div:first-child {
        position: relative;
        width: 82px;
        height: 82px;
        border: 1px solid rgba(0, 0, 0, .7);

        & > div.image {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            background-image: url(${championImage});
        }

        & > div.position {
            position: absolute;
            right: 0;
            bottom: 0;
            text-align: right;

            & > span {
                background-color: #353b3e;
                margin-bottom: 2px;
                font-size: 12px;
                color: white;
                padding: 0px 4px;
            }
        }
    }

    & > div.name {
        margin-top: 4px;
        font-size: 12px;
        width: 82px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

interface ChampionProps {
    id: number;
    name: string;
    position: string[];
}

const Champion: React.FC<ChampionProps> = (props) => {
    return (
        <ChampionWrapper>
            <div>
                <div className={`image __spc82-${props.id}`}></div>
                <div className="position">
                    {props.position.map(p => {
                        return (
                            <>
                                <span>{p}</span>
                                <br/>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="name">{props.name}</div>
        </ChampionWrapper>
    )
}

export default Champion;