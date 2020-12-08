import { Tuid, Map, Query, Action, Sheet, Book } from "tonva";

export interface UqOrder {
    //a: Tuid;
    //b: Tuid;
    SetCart: Action;
    RemoveFromCart: Action;
    MergeCart: Action;
    Order: Sheet;
    GetCart: Query;
    GetPendingPayment: Query;
    CommonText: Tuid;
}

export interface UqProduct {
    ProductX: Tuid;
    ProductCategory: Tuid;
    PriceX: Map;
    AgentPrice: Map;
    ProductChemical: Map;
    ProductMSDSFile: Map;
    ProductSpecFile: Map;
    Brand: Tuid;
    GetRootCategory: Query;
    GetRootCategories: Query;
    GetChildrenCategory: Query;
    SearchProduct: Query;
    SearchProductByCategory: Query;
    GetFutureDeliveryTime: Query;
    GetProductByOrigin: Query;
}

export interface UqCommon {
    SalesRegion: Tuid;
    Language: Tuid;
    Address: Tuid;
    InvoiceType: Tuid;
    GetCountryProvinces: Query;
    GetProvinceCities: Query;
    GetCityCounties: Query;
}

export interface UqWebUser {
    WebUser: Tuid;
    WebUserContact: Map;
    WebUserSetting: Map;
    WebUserCustomer: Map;
    WebUserContacts: Map;
    WebUserBuyerAccount: Map;
    myFavorites: Map;
    getMyFavirates: Query;
    WebUserVIPCard: Map;
    WebUserCoupon: Map;
    WebUserCouponUsed: Map;
    getMyUsedCoupon: Query,
    getMyExpiredCoupon: Query,

    RecordLogin: Action,
}

export interface UqCustomer {
    Contact: Tuid;
    InvoiceInfo: Tuid;
    CustomerContacts: Map;
    CustomerSetting: Map;
    CustomerContractor: Map;
}

export interface UqCustomerDiscount {
    GetDiscount: Query;
}

export interface UqPromotion {
    GetPromotionPack: Query;
}

export interface UqWarehouse {
    GetInventoryAllocation: Query;
}

export interface UqSalesTask {
    Coupon: Tuid;
    IsCanUseCoupon: Action;

    VIPCardDiscount: Map;
    BottomDiscount: Map;
}

export interface UqMember {
    MemberAction: Action;
    MemberRecommender: Map;
}

export interface UqPointShop {
    Genre: Tuid;
    PointProductGenre: Map;
    PointProduct: Map;
    PointHistory: History;
    PointExchangeSheet: Sheet;
    getPoints: Query;
    GetPointProduct: Query;
    GetNewPointProducts: Query;
    GetHotPointProducts: Query;
    SetPointProductVisits: Action;
    PointProductLib: Tuid;
    PointProductSource: Map;
    GetPointProductByGenre: Query;
    // TODO：delete
    AddPoint: Action;
    IsCanUseOrder: Action;

    // TODO：delete
    GetPlatFormOrder: Query;
    GetLastPlatFormOrder: Action;
    AddPlatformOrderPoint: Action;
    AddUsedCoupon: Action;

    GetPointHistory: Query;
    GetPointSigninHistory: Query;
    WebUserCredits: Map;
    WebUserCreditsUsed: Map;
    SigninSheet: Sheet;
    checkIsSignin: Query;
    Signin: Action;
}

export interface UqWebBuilder {
    GetSlideShow: Query;
}

export interface UqOrderDraft {
    OrderDraft: Sheet;
}
export interface UQs {
    order: UqOrder;
    product: UqProduct;
    common: UqCommon;
    webuser: UqWebUser;
    customer: UqCustomer;
    customerDiscount: UqCustomerDiscount;
    promotion: UqPromotion;
    warehouse: UqWarehouse;
    salesTask: UqSalesTask;
    member: UqMember;
    积分商城: UqPointShop;
    webBuilder: UqWebBuilder;
    orderDraft: UqOrderDraft;
}
