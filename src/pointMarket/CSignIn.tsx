import { CApp } from 'CApp';
import { CUqBase } from 'CBase';
import { makeObservable, observable } from 'mobx';
import { QueryPager } from "tonva-react";
import { VPointSign, daysAndMultipleByWelfare } from './VPointSign';
import { VRevenueExpenditure } from './VRevenueExpenditure';

const pointBase: number = 3; /* 积分基数 */

export class CSignIn extends CUqBase {
    signinval: number = pointBase;         /* 签到可领积分 */
    signinConsecutiveDays: number = 0;     /* 连续签到天数 */
    IsSignin: boolean = false;             /* 是否签到 */
    signinPageHistory: QueryPager<any>;    /* 签到记录 */

    constructor(cApp: CApp) {
        super(cApp);

        makeObservable(this, {
            signinval: observable,
            signinConsecutiveDays: observable,
            IsSignin: observable,
            signinPageHistory: observable
        });
    }
    
    async internalStart(param?: any) { }

    /**
     * 签到   ------------------ 需调用连续签到天数 uq:this.getSigninConsecutiveDays --------------------
     */
    openPointSign = async () => {
        if (!this.isLogined)
            await this.cApp.cPointProduct.loginMonitor();
        else {
            await this.isSignined();
            if (this.IsSignin)
                await this.addSigninSheet(47, this.signinval);
            await this.getSigninConsecutiveDays();
            this.openVPage(VPointSign);
        }
    }

    /**
    * 签到明细页面
    */
    openRevenueExpenditure = async (topic?: any) => {
        await this.getSigninHistory();
        this.openVPage(VRevenueExpenditure, topic)
    }

    /**
     * 是否签到
     */
    isSignined = async () => {
        let { currentUser } = this.cApp;
        let { checkIsSignin } = this.uqs.积分商城;
        let res = await checkIsSignin.obj({ customer: currentUser?.currentCustomer });
        this.IsSignin = res.result === 0 ? true : false;
    }

    /**
     * 签到添加积分到
     */
    addSigninSheet = async (customer: any, amount: any) => {
        let { cPointProduct } = this.cApp;
        let { Signin } = this.uqs.积分商城;
        customer = this.cApp.currentUser?.currentCustomer;
        // customer = customer ? customer : this.user.id;
        await Signin.submit({ webuser: this.user.id, customer: customer, amount: amount });
        await cPointProduct.refreshMypoint();
        // await this.getSigninConsecutiveDays();
        // await this.getSigninHistory();
        // await this.getPointHistory();

        /**
        let result: any = await SigninSheet.save("SigninSheet", { customer: customer, amount: amount });
        console.log(this.cApp.currentUser);
        let { id, flow, state } = result;
        await SigninSheet.action(id, flow, state, "submit");
        await Signin.submit({ webbuser: 47, customer: 47, amount: 3 });
        **/
    }


    /**
     * 获取签到记录
     */
    getSigninHistory = async () => {
        let { currentUser } = this.cApp;
        this.signinPageHistory = new QueryPager(this.uqs.积分商城.GetPointSigninHistory, 15, 30);
        this.signinPageHistory.first({ customer: currentUser?.currentCustomer });
    }

    /**
     * 连续签到天数  webUser  ----------------------------需uq --------------------------------
     */
    getSigninConsecutiveDays = async () => {
        // this.signinConsecutiveDays 
        await this.getSigninHistory();

    }

    /**
     * 福利：连续签到 数倍积分（弃用）
     */
    /* multiplePointsWelfare = () => {
        let arr = daysAndMultipleByWelfare;
        if (this.IsSignin) this.signinConsecutiveDays += 1;
        for (let i = 0; i < arr.length; i++) {
            if (this.signinConsecutiveDays < arr[i].days) {
                if (i === 0) this.signinval = pointBase;
                else this.signinval = pointBase * arr[i - 1].multiple;
                return arr[i];
            } else if (this.signinConsecutiveDays >= arr[i].days && i === (arr.length - 1)) {
                this.signinval = pointBase * arr[i].multiple;
                return arr[i];
            }
        }
    } */

}
