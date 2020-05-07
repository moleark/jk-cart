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
    Brand: Tuid;
    GetRootCategory: Query;
    GetRootCategories: Query;
    GetChildrenCategory: Query;
    SearchProduct: Query;
    SearchProductByCategory: Query;
    GetFutureDeliveryTime: Query;
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
    IsCanUseCoupon: Action;
}

export interface UqMember {
    MemberAction: Action;
    MemberRecommender: Map;
}

export interface UqPointShop {
    PointProduct: Map;
    PointHistory: History;
    PointExchangeSheet: Sheet;
    getPoints: Query;
    GetPointProduct: Query;
    AddPoint: Action;
    IsCanUseOrder: Action;
    GetPlatFormOrder: Query;
    GetLastPlatFormOrder: Action;
    AddPlatformOrderPoint: Action;
    AddUsedCoupon: Action;
    WebuserCoupon: Map;
    WebuserCouponUsed: Map;
}

export interface UqWebBuilder {
    GetSlideShow: Query;
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
}
