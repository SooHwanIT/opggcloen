import React from "react";
import styled from "styled-components"

const HeaderWrapper = styled.div<{height: number}>`
    width: 100vw;
    height: ${(props) => props.height}px;

    display: flex;
    flex-direction: column;

    & > div {
        flex: 1;
        line-height: ${(props) => props.height/2}px;
    }

    & > div:first-child{
        background-color: #5383e8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;

        font-size: 15px;
    }

    & > div:last-child{
        background-color: rgba(0,0,0,0.5);
        color: white;
        font-size: 13px;
        padding: 0 80px;

        cursor: pointer;

        :hover{
            text-decoration: underline;
        }
    }

`

const HeaderItemWrapper = styled.div`
    display: flex;
`

const HeaderItem = styled.div<{active?: boolean}>`
    color: rgba(255, 255, 255, ${(props) => props.active ? 1 : .7});
    margin: 0 16px;
    box-shadow: 0px ${(props) => props.active ? -3 : 0}px 0px 0px #fff inset;
    cursor: pointer;

    :hover{
        color: rgba(255, 255, 255, 1);
        box-shadow: 0px -3px 0px 0px #fff inset;
    }
`

const HeaderPointItem = styled.div<{active?: boolean}>`
    color: rgba(${(props) => props.active ? 0 : 255}, ${(props) => props.active ? 253 : 255}, ${(props) => props.active ? 237 : 255}, 1);
    margin: 0 16px;
    cursor: pointer;

    :hover{
        color: rgba(255, 255, 255, 1);
        box-shadow: 0px -3px 0px 0px #fff inset;
    }
`

const HeaderInput = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    height: 40px;
    border-radius: 5px;

    & > div:first-child {
        color: #4171d6;
        position: relative;
        background-color: #ecf2ff;
        line-height: 40px;
        padding: 0 12px;
        padding-right: 30px;
        font-size: 13px;

        border-top-left-radius: 10px;
        border-bottom-left-radius: 5px;

        cursor: pointer;

        &::after{
            content: "";
            position: absolute;
            right: 12px;
            top: 50%;
            margin-top: -2px;
            border-top: 4px solid #5383e8;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
        }
    }

    & > input{
        border: none;
        outline: none;
        padding: 0 10px;
        font-size: 12px;
    }

    & img{
        height: 14px;
        margin-right: 10px;
        cursor: pointer;
    }
`

interface HeaderProps{
    headerHeight: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    return(
        <HeaderWrapper height={props.headerHeight}>
            <div>
                <HeaderItemWrapper>
                    <HeaderItem>#집에있자</HeaderItem>
                    <HeaderItem active={true}>챔피언 분석</HeaderItem>
                    <HeaderPointItem active={true}>칼바람</HeaderPointItem>
                    <HeaderPointItem active={true}>우르프</HeaderPointItem>
                    <HeaderItem>통계</HeaderItem>
                    <HeaderItem>랭킹</HeaderItem>
                    <HeaderItem>프로관전</HeaderItem>
                    <HeaderItem>멀티서치</HeaderItem>
                    <HeaderItem>OP셜</HeaderItem>
                    <HeaderItem>커뮤니티</HeaderItem>
                </HeaderItemWrapper>
                <HeaderInput>
                    <div>KR</div>
                    <input type="text" placeholder="소환사명, 소환사명 ..."/>
                    <div>
                        <img src="https://opgg-static.akamaized.net/images/gnb/svg/00-icon-gg.svg"/>
                    </div>
                </HeaderInput>
            </div>
            <div>해당 사이트는 교육을 위해 클론코딩 된 것 입니다.</div>
        </HeaderWrapper>
    );
}

export default Header;