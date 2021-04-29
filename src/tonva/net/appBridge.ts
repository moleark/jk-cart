import _ from 'lodash';
import {nav} from '../components';
import {uid} from '../tool/uid';
import {uqTokenApi, callCenterapi, centerToken, setCenterToken, UqTokenApi} from './uqApi';
import {setSubAppWindow} from './wsChannel';
import { host } from './host';
import { env } from '../tool';

export interface UqToken {
    name: string;
    db: string;
    url: string;
    token: string;
}
const uqTokens:{[uqName:string]: UqToken}  = {};
export function logoutUqTokens() {
    for (let i in uqTokens) {
        uqTokens[i] = undefined;
    }
	UqTokenApi.clearLocal();
}
/*
export interface AppInFrame {
    hash: string;
    unit: number;       // unit id
    page?: string;
    param?: string[];
    predefinedUnit?: number;  // 比如像Cart这样的应用，直接让用户访问的，就需要在unit.json里面定义unitName
}
const appsInFrame:{[key:string]:AppInFrame} = {};

class AppInFrameClass implements AppInFrame {
    hash: string;
    private _unit: number;
    get unit(): number {return this._unit;}       // unit id
    set unit(val:number) { this._unit=val;}
    page?: string;
    param?: string[];
}

export let appInFrame:AppInFrame = new AppInFrameClass();
*/
/* {
    hash: undefined,
    get unit():number {return } undefined, //debugUnitId,
    page: undefined;
    param: undefined,
}*/

export function isBridged():boolean {
    return window.self !== window.parent;
}

window.addEventListener('message', async function(evt) {
    var message = evt.data;
	if (!message) return;
    switch (message.type) {
        case 'sub-frame-started':
            subFrameStarted(evt);
            break;
        case 'ws':
            //wsBridge.receive(message.msg);
            await nav.onReceive(message.msg);
            break;
        case 'init-sub-win':
            await initSubWin(message);
            break;
        case 'pop-app':
            window.console.log('///\\\\\\ pop-app');
            nav.navBack();
            break;
        case 'center-api':
            await callCenterApiFromMessage(evt.source as Window, message);
            break;
        case 'center-api-return':
            bridgeCenterApiReturn(message);
            break;
        case 'app-api':
            let ret = await onReceiveAppApiMessage(message.hash, message.apiName);
            (evt.source as Window).postMessage({
                type: 'app-api-return', 
                apiName: message.apiName,
                db: ret.db,
                url: ret.url,
                token: ret.token} as any, "*");
            break;
        case 'app-api-return':
            console.log("app-api-return: %s", JSON.stringify(message));
            console.log('await onAppApiReturn(message);');
            await onAppApiReturn(message);
            break;
        default:
			if ((message.source as string)?.startsWith('react-devtools') === true) break;
            window.console.log('message: %s', JSON.stringify(message));
            break;
    }
});

function subFrameStarted(evt:any) {
    var message = evt.data;
    let subWin = evt.source as Window;
    setSubAppWindow(subWin);
    hideFrameBack(message.hash);
    let msg:any = _.clone(nav.user);
    msg.type = 'init-sub-win';
    subWin.postMessage(msg, '*');
}
function hideFrameBack(hash:string) {
    let el = document.getElementById(hash);
    if (el !== undefined) el.hidden = true;
}
async function initSubWin(message:any) {
    console.log('initSubWin: set nav.user', message);
    let user = nav.user = message; // message.user;
    setCenterToken(user.id, user.token);
    await nav.showAppView();
}
async function onReceiveAppApiMessage(hash: string, apiName: string): Promise<UqToken> {
    //let appInFrame = appsInFrame[hash];
    //if (appInFrame === undefined) return {name:apiName, db:undefined, url:undefined, token:undefined};
    //let unit = getUnit();
    //let {unit, predefinedUnit} = appInFrame;
    //unit = unit || predefinedUnit;
	let {unit} = env;
    if (!unit) {
        console.error('no unit defined in unit.json or in index.html, or not logined in', unit);
    }
    let parts = apiName.split('/');
    let param = {unit: unit, uqOwner: parts[0], uqName: parts[1], appOwner: parts[2], appName:parts[3]};
    console.log('uqTokenApi.uq onReceiveAppApiMessage', param);
    let ret = await uqTokenApi.uq(param);
    let {db, url, token} = ret;
    return {name: apiName, db:db, url: url, token: token};
}

async function onAppApiReturn(message:any) {
    let {apiName, db, url, urlTest, token} = message;
    let action = uqTokenActions[apiName];
    if (action === undefined) {
        throw new Error('error app api return');
        //return;
    }
    let realUrl = host.getUrlOrTest(db, url, urlTest);
    console.log('onAppApiReturn(message:any): url=' + url + ', real=' + realUrl);
    //action.url = realUrl;
    //action.token = token;
    action.resolve({
        name: apiName,
        db: db,
        url: realUrl,
        token: token,
    } as UqToken);
}
/*
export function setAppInFrame(appHash: string):AppInFrame {
    if (appHash) {
        let parts = appHash.split('-');
        let len = parts.length;
        if (len > 0) {
            let p = 1;
            appInFrame.hash = parts[p++];
            if (len>0) appInFrame.unit = Number(parts[p++]);
            if (len>1) appInFrame.page = parts[p++];
            if (len>2) appInFrame.param = parts.slice(p++);
        }
    }
    return appInFrame;
}

export function getExHashPos():number {
    let hash = document.location.hash;
    if (hash !== undefined && hash.length > 0) {
        let pos = hash.lastIndexOf('#tv-');
        if (pos < 0) pos = hash.lastIndexOf('#tvdebug-');
        return pos;
    }
    return -1;
}

export function getExHash():string {
    let pos = getExHashPos();
    if (pos < 0) return undefined;
    return document.location.hash.substring(pos);
}

export function appUrl(url: string, unitId: number, page?:string, param?:any[]):{url:string; hash:string} {
    let u:string;
    for (;;) {
        u = uid();
        let a = appsInFrame[u];
        if (a === undefined) {
            appsInFrame[u] = {hash:u, unit:unitId};
            break;
        }
    }
    url += '#tv-' + u + '-' + unitId;
    if (page !== undefined) {
        url += '-' + page;
        if (param !== undefined) {
            for (let i=0; i<param.length; i++) {
                url += '-' + param[i];
            }
        }
    }
    return {url: url, hash: u};
}
/*
function getUnit():number {
	let {unit, predefinedUnit} = appInFrame;
    let realUnit = unit || predefinedUnit;
    if (realUnit === undefined) {
        throw new Error('no unit defined in unit.json or not logined in');
	}
    return realUnit;
}
*/
interface UqTokenAction {
    resolve: (value?: UqToken | PromiseLike<UqToken>) => void;
    reject: (reason?: any) => void;
}
const uqTokenActions:{[uq:string]: UqTokenAction} = {};
export async function buildAppUq(uq:string, uqOwner:string, uqName:string, appOwner:string, appName:string):Promise<void> {
    if (!isBridged()) {
        //let unit = getUnit();
		let {unit} = env;
        let uqToken = await uqTokenApi.uq({unit,  uqOwner, uqName, appOwner, appName});
        if (uqToken.token === undefined) uqToken.token = centerToken;
        let {db, url, urlTest} = uqToken;
        let realUrl = host.getUrlOrTest(db, url, urlTest);
        console.log('realUrl: %s', realUrl);
        uqToken.url = realUrl;
        uqTokens[uq] = uqToken;
        return uqToken;
    }
    //console.log("**** before buildAppUq ****", appInFrame);
    let bp = uqTokenActions[uq];
    if (bp !== undefined) return;
    return new Promise<void>((resolve, reject) => {
        uqTokenActions[uq] = {
            resolve: async (at:any) => {
                let {db, url, token} = await at;
                uqTokens[uq] = {
                    name: uq,
                    db: db,
                    url: url,
                    token: token,
                };
                uqTokenActions[uq] = undefined;
                //console.log("**** after buildAppUq ****", appInFrame);
                resolve();
            },
            reject: reject,
        };
        (window.opener || window.parent).postMessage({
            type: 'app-api',
            apiName: uq,
            //hash: appInFrame.hash,
        }, "*");
    });
}

export function appUq(uq:string):UqToken {
    let uts = uqTokens;
    return uts[uq];
}

interface BridgeCenterApi {
    id: string;
    resolve: (value?:any)=>any;
    reject: (reason?:any)=>void;
}
const brideCenterApis:{[id:string]: BridgeCenterApi} = {};
export async function bridgeCenterApi(url:string, method:string, body:any):Promise<any> {
    console.log('bridgeCenterApi: url=%s, method=%s', url, method);
    return await new Promise<any>(async (resolve, reject) => {
        let callId:string;
        for (;;) {
            callId = uid();
            let bca = brideCenterApis[callId];
            if (bca === undefined) {
                brideCenterApis[callId] = {
                    id: callId,
                    resolve: resolve,
                    reject: reject,
                }
                break;
            }
        }
        (window.opener || window.parent).postMessage({
            type: 'center-api',
            callId: callId,
            url: url,
            method: method,
            body: body
        }, '*');
    });
}

async function callCenterApiFromMessage(from:Window, message:any):Promise<void> {
    let {callId, url, method, body} = message;
    let result = await callCenterapi.directCall(url, method, body);
    from.postMessage({
        type: 'center-api-return',
        callId: callId,
        result: result,
    }, '*');
}

function bridgeCenterApiReturn(message:any) {
    let {callId, result} = message;
    let bca = brideCenterApis[callId];
    if (bca === undefined) return;
    brideCenterApis[callId] = undefined;
    bca.resolve(result);
}
