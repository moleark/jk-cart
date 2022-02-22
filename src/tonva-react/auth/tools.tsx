import * as React from 'react';
import { nav } from '../components';
import { mobileRegex, emailRegex } from '../tool';
import logo from '../img/logo.svg';

export function tonvaTop() {
    return nav.loginTop(<div className="d-flex align-items-center position-relative">
        <img className="App-logo h-3c position-absolute" src={logo} alt="img" />
        <div className="h3 flex-fill text-center"><span className="text-primary mr-3">同</span>
            <span className="text-danger">花</span>
        </div>
    </div>);
}

interface Sender {
    type: string;
    caption: string;
    regex: RegExp;
}

const senders:Sender[] = [
    {type:'mobile', caption:'手机号', regex: mobileRegex},
    {type:'email', caption:'邮箱', regex: emailRegex}
];

export function getSender(un: string):Sender {
    let sender = senders.find(v => v.regex.test(un) === true);
    return sender;
}