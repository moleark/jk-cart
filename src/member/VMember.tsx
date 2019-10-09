import * as React from 'react';
import { VPage, Image } from 'tonva';
import { CMember } from './CMember';
import { LMR, Muted, FA, Media } from 'tonva';
import pig from '../images/pig.png';
import { observer } from 'mobx-react';

const stylePig: React.CSSProperties = {
    width: '100%',
    height: '20rem',
    backgroundImage: `url(${pig})`,
    backgroundSize: 'contain',
    backgroundColor: 'rgba(255,255,255,0.1)',
    opacity: 0.09,
    position: 'absolute',
}

export class VMember extends VPage<CMember> {
    private recommendationCodeRef = React.createRef<HTMLInputElement>();

    async open(param: any) {

    }

    render(member: any): JSX.Element {

        return <this.content />;
    }

    private submitRecommendationCode() {
        let code = this.recommendationCodeRef.current.value;
        if (code) {
            let { setReferrer: submit } = this.controller;
            submit(code);
        }
    }

    private content = observer(() => {
        let { cApp, member } = this.controller;
        if (member === undefined)
            return <></>;
        let { currentUser } = cApp;
        let { recommendationCode, point } = member;
        if (!point) point = 0;

        let im = <Image className="mr-3 w-3c h-3c" src={currentUser.icon} />;
        let inviteCode = <div className="small">邀请码: {recommendationCode}</div>;

        let divPoints = <div className="my-3 text-center bg-white h-25" style={{ position: 'relative' }}>
            <div className="w-100 bg-white h-20c" style={{ position: 'absolute' }} />
            <div className="d-flex align-items-center justify-content-center" style={stylePig} />
            <div className="w-100 d-flex align-items-center justify-content-center h-20c" style={{ position: 'absolute' }}>
                <div className="muted mr-3 small">积分: </div>
                <div className="text-danger" style={{ fontSize: '2rem' }}>{point}</div>
            </div>
        </div>

        let pointTitle = <p className="h4">我的积分</p>
        let pointDetail = <p className="small align-self-end">查看详情 <FA name="angle-right"></FA></p>
        let pointThisWeek = <><p className="h5 mb-0">0</p><Muted>本周</Muted></>
        let pointAll = <><p className="h5 mb-0">{point}</p><Muted>累计</Muted></>

        let fansTitle = <p>我的粉丝</p>
        let fansDetail = <p className="small align-self-end">查看详情 <FA name="angle-right"></FA></p>;
        let detail = <div className="shadow bg-white rounded p-3 mb-1">
            <LMR left={fansTitle} right={fansDetail}></LMR>
            <LMR className="pb-2">
                <p className="h4 mb-0">0</p>
                <Muted>今日</Muted>
            </LMR>
            <LMR left={pointThisWeek} right={pointAll} />
            <LMR>
                <input type="text" className="form-control" ref={this.recommendationCodeRef} />
                <button type="button" className="btn btn-primary" onClick={() => this.submitRecommendationCode()}>输入邀请码</button>
            </LMR>
        </div>;

        return <div>
            <LMR className="bg-white p-3 mb-1 align-items-center"
                left={im} right={inviteCode}>
                <b>{currentUser.name}</b>
            </LMR>
            {divPoints}
            {/*detail*/}
        </div>
    })
}
/*
<div className="shadow bg-white rounded p-3 mb-1">
<LMR left={pointTitle} right={pointDetail}></LMR>
<LMR className="pb-2">
    <p className="h4 mb-0">0</p>
    <Muted>今日</Muted>
</LMR>
<LMR left={pointThisWeek} right={pointAll} />
</div>
*/