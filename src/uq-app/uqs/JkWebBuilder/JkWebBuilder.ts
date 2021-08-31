//=== UqApp builder created on Tue Aug 31 2021 13:51:04 GMT+0800 (中国标准时间) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqBook, UqQuery, UqMap, UqHistory, UqID } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/webBuilder ========
//===============================

export interface Tuid$user {
	id?: number;
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface TuidTag {
	id?: number;
	name: string;
	description: string;
	createtTime: any;
	creator: number;
}

export interface Tuid$sheet {
	id?: number;
	no: string;
	user: number;
	date: any;
	sheet: number;
	version: number;
	flow: number;
	app: number;
	state: number;
	discription: string;
	data: string;
	processing: number;
}

export interface TuidTemplate {
	id?: number;
	caption: string;
	author: number;
	content: string;
	contentModule: string;
}

export interface TuidContent {
	id?: number;
	name: string;
	content: string;
	template: number;
	creator: number;
}

export interface TuidPOST {
	id?: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	businessScope: number;
	language: number;
	template: number;
	content: string;
	emphasis: number;
	isValid: number;
}

export interface TuidIMAGE {
	id?: number;
	caption: string;
	path: string;
	author: number;
	isValid: number;
	types: number;
}

export interface TuidBRANCH {
	id?: number;
	content: string;
	author: number;
	branchType: number;
}

export interface TuidWebPage {
	id?: number;
	name: string;
	titel: string;
	template: number;
	discription: string;
	author: number;
}

export interface TuidIp {
	id?: number;
	ip: string;
}

export interface TuidBrand {
	id?: number;
	name: string;
}

export interface TuidProductX {
	id?: number;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
}

export interface TuidProductCategory {
	id?: number;
	no: number;
	parent: number;
	isLeaf: number;
	orderWithinParent: number;
}

export interface TuidSubject {
	id?: number;
	name: string;
	parent: number;
	isValid: number;
}

export interface TuidIMGCat {
	id?: number;
	parent: number;
	name: string;
	isValid: number;
}

export interface TuidBusinessScope {
	id?: number;
	name: string;
}

export interface TuidClassroomType {
	id?: number;
	name: string;
}

export interface TuidDomain {
	id?: number;
	name: string;
	parent: number;
}

export interface TuidWebsite {
	id?: number;
	name: string;
	url: string;
}

export interface TuidMadiaType {
	id?: number;
	name: string;
}

export interface ParamTest {
	a1: number;
	a2: number;
}
export interface ResultTest {
}

export interface ParamPublishPost {
	_post: number;
	_startDate: any;
	_endDate: any;
	tags: {
		tagName: number;
	}[];

}
export interface ResultPublishPost {
}

export interface ParamAddBrowsingHistory {
	object: number;
	objectType: string;
	ipAddress: string;
}
export interface ResultAddBrowsingHistory {
}

export interface ParamHit {
	oneHit: {
		tick: number;
		ip: string;
		post: number;
		sales: number;
		source: number;
	}[];

}
export interface ResultHit {
}

export interface ParamCalcHot {
}
export interface ResultCalcHot {
}

export interface ParamPublishPostForProduct {
	_post: number;
	_product: number;
}
export interface ResultPublishPostForProduct {
}

export interface ParamAddPostEvaluate {
	_post: number;
	_ip: string;
	_grade: string;
}
export interface ResultAddPostEvaluate {
}

export interface ParamAddPostResearchField {
	_post: number;
	_tag: string;
}
export interface ResultAddPostResearchField {
}

export interface ParamAddPost {
	_id: number;
	_caption: string;
	_discription: string;
	_image: number;
	_template: number;
	_content: string;
	_emphasis: number;
	_language: number;
}
export interface ReturnAddPostRet {
	id: number;
}
export interface ResultAddPost {
	ret: ReturnAddPostRet[];
}

export interface ParamAddPostProductCatalog {
	_post: number;
	_productCategory: number;
	_name: string;
}
export interface ResultAddPostProductCatalog {
}

export interface ParamAddPostSubject {
	_post: number;
	_subject: number;
}
export interface ResultAddPostSubject {
}

export interface ParamAddPostProductCatalogExplain {
	_post: number;
	_productCategory: number;
	_name: string;
}
export interface ResultAddPostProductCatalogExplain {
}

export interface ParamTransmitPost {
	_post: number;
}
export interface ResultTransmitPost {
}

export interface ParamUpdateSlideShow {
	image: number;
	types: number;
	caption: string;
	description: string;
	src: string;
	sort: number;
}
export interface ResultUpdateSlideShow {
}

export interface ParamDeleteSlideShow {
	_image: number;
}
export interface ResultDeleteSlideShow {
}

export interface ParamAddPostDomain {
	_post: number;
	_domain: number;
}
export interface ResultAddPostDomain {
}

export interface ParamAddInformationPost {
	_post: number;
	_sort: number;
}
export interface ResultAddInformationPost {
}

export interface ParamDelPostSubject {
	_post: number;
	_subject: number;
}
export interface ResultDelPostSubject {
}

export interface ParamHitOfManual {
	post: number;
	source: number;
	hit: number;
	hitdate: any;
}
export interface ResultHitOfManual {
}

export interface ParamDelSubjectDefault {
	_subject: number;
}
export interface ResultDelSubjectDefault {
}

export interface ParamSearchPost {
	key: string;
	author: number;
	businessScope: number;
	status: number;
}
export interface ReturnSearchPost$page {
	id: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	template: number;
	$update: any;
	$create: any;
	isValid: number;
	emphasis: number;
	language: number;
	hits: number;
	sumHits: number;
	web: number;
	agent: number;
	assist: number;
	openweb: number;
	bvweb: number;
}
export interface ResultSearchPost {
	$page: ReturnSearchPost$page[];
}

export interface ParamSearchTemplate {
	key: string;
}
export interface ReturnSearchTemplate$page {
	id: number;
	caption: string;
	author: number;
	content: string;
	contentModule: string;
}
export interface ResultSearchTemplate {
	$page: ReturnSearchTemplate$page[];
}

export interface ParamSearchImage {
	key: string;
	types: number;
}
export interface ReturnSearchImage$page {
	id: number;
	caption: string;
	path: string;
	author: number;
	isValid: number;
	types: number;
}
export interface ResultSearchImage {
	$page: ReturnSearchImage$page[];
}

export interface ParamSearchWebPage {
	key: string;
	author: number;
}
export interface ReturnSearchWebPage$page {
	id: number;
	name: string;
	discription: string;
	titel: string;
	author: number;
	$update: any;
	$create: any;
}
export interface ResultSearchWebPage {
	$page: ReturnSearchWebPage$page[];
}

export interface ParamSearchBranch {
	key: string;
}
export interface ReturnSearchBranch$page {
	id: number;
	author: number;
	content: string;
	branchType: number;
}
export interface ResultSearchBranch {
	$page: ReturnSearchBranch$page[];
}

export interface ParamSearchPrivateBranch {
	_page: number;
}
export interface ReturnSearchPrivateBranchRet {
	id: number;
	content: string;
	branchType: number;
	author: number;
	sort: number;
}
export interface ResultSearchPrivateBranch {
	ret: ReturnSearchPrivateBranchRet[];
}

export interface ParamSearchTotalBrowsing {
}
export interface ReturnSearchTotalBrowsingRet {
	user: number;
	PostTotal: number;
	PageTotal: number;
}
export interface ResultSearchTotalBrowsing {
	ret: ReturnSearchTotalBrowsingRet[];
}

export interface ParamHotPosts {
}
export interface ReturnHotPostsRet {
	hits: number;
	post: number;
	caption: string;
	discription: string;
	image: number;
	imagePath: string;
	author: number;
	create: number;
	update: number;
}
export interface ResultHotPosts {
	ret: ReturnHotPostsRet[];
}

export interface ParamSearchPostPublish {
	key: string;
	domain: number;
	publish: number;
	language: number;
}
export interface ReturnSearchPostPublish$page {
	id: number;
	post: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	template: number;
	$update: any;
	$create: any;
	publishdate: any;
	isValid: number;
	emphasis: number;
	language: number;
	hits: number;
	sumHits: number;
}
export interface ResultSearchPostPublish {
	$page: ReturnSearchPostPublish$page[];
}

export interface ParamSearchPostPublishForProduct {
	_post: number;
}
export interface ReturnSearchPostPublishForProductRet {
	product: number;
	post: number;
	operator: number;
	update: any;
}
export interface ResultSearchPostPublishForProduct {
	ret: ReturnSearchPostPublishForProductRet[];
}

export interface ParamSearchPostEvaluate {
	_post: number;
}
export interface ReturnSearchPostEvaluateRet {
	post: number;
	GradeA: number;
	GradeB: number;
	GradeC: number;
	GradeD: number;
	GradeE: number;
}
export interface ResultSearchPostEvaluate {
	ret: ReturnSearchPostEvaluateRet[];
}

export interface ParamSearchPostResearchField {
	_post: number;
}
export interface ReturnSearchPostResearchFieldRet {
	value: number;
}
export interface ResultSearchPostResearchField {
	ret: ReturnSearchPostResearchFieldRet[];
}

export interface ParamSearchAchievement {
	_type: string;
	_year: number;
}
export interface ReturnSearchAchievementRet {
	yeara: string;
	montha: string;
	postPubSum: number;
	postTranSum: number;
	postHitSum: number;
}
export interface ResultSearchAchievement {
	ret: ReturnSearchAchievementRet[];
}

export interface ParamSearchProductCategoryPost {
	author: number;
	productCategory: number;
	publish: number;
}
export interface ReturnSearchProductCategoryPost$page {
	id: number;
	post: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	template: number;
	$update: any;
	$create: any;
	publishdate: any;
	isValid: number;
	emphasis: number;
	language: number;
	hits: number;
	sumHits: number;
	web: number;
	agent: number;
	assist: number;
	openweb: number;
	bvweb: number;
}
export interface ResultSearchProductCategoryPost {
	$page: ReturnSearchProductCategoryPost$page[];
}

export interface ParamSearchSubject {
	_parent: number;
}
export interface ReturnSearchSubject$page {
	id: number;
	name: string;
	counts: number;
	child: number;
}
export interface ResultSearchSubject {
	$page: ReturnSearchSubject$page[];
}

export interface ParamSearchSubjectPost {
	author: number;
	subject: number;
	publish: number;
}
export interface ReturnSearchSubjectPost$page {
	id: number;
	post: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	template: number;
	$update: any;
	$create: any;
	publishdate: any;
	isValid: number;
	emphasis: number;
	language: number;
	hits: number;
	sumHits: number;
	web: number;
	agent: number;
	assist: number;
	openweb: number;
	bvweb: number;
}
export interface ResultSearchSubjectPost {
	$page: ReturnSearchSubjectPost$page[];
}

export interface ParamSearchPostSubject {
	_post: number;
}
export interface ReturnSearchPostSubjectRet {
	subject: number;
	name: string;
}
export interface ResultSearchPostSubject {
	ret: ReturnSearchPostSubjectRet[];
}

export interface ParamSearchPostCatalog {
	_post: number;
}
export interface ReturnSearchPostCatalogRet {
	post: number;
	productCategory: number;
	name: string;
}
export interface ResultSearchPostCatalog {
	ret: ReturnSearchPostCatalogRet[];
}

export interface ParamSearchPostCatalogExplain {
	_post: number;
}
export interface ReturnSearchPostCatalogExplainRet {
	post: number;
	productCategory: number;
	name: string;
}
export interface ResultSearchPostCatalogExplain {
	ret: ReturnSearchPostCatalogExplainRet[];
}

export interface ParamSearchAchievementOfTeamDetail {
	_manage: number;
	_type: string;
	_year: string;
	_month: string;
}
export interface ReturnSearchAchievementOfTeamDetailRet {
	year: string;
	month: string;
	day: string;
	author: number;
	postPubSum: number;
	postTranSum: number;
	postHitSum: number;
	percent: number;
	hitWeb: number;
	hitAgent: number;
	hitAssist: number;
	hitEmail: number;
	hitOther: number;
}
export interface ResultSearchAchievementOfTeamDetail {
	ret: ReturnSearchAchievementOfTeamDetailRet[];
}

export interface ParamSearchAchievementOfTeam {
	_manage: number;
	_year: number;
	_type: string;
}
export interface ReturnSearchAchievementOfTeamRet {
	yeara: string;
	montha: string;
	daya: string;
	postPubSum: number;
	postTranSum: number;
	postHitSum: number;
	percent: number;
	hitWeb: number;
	hitAgent: number;
	hitAssist: number;
	hitEmail: number;
	hitOther: number;
}
export interface ResultSearchAchievementOfTeam {
	ret: ReturnSearchAchievementOfTeamRet[];
}

export interface ParamSearchCat {
	parent: number;
}
export interface ReturnSearchCat$page {
	id: number;
	parent: number;
	name: string;
}
export interface ResultSearchCat {
	$page: ReturnSearchCat$page[];
}

export interface ParamSearchCatImage {
	key: string;
	cat: number;
}
export interface ReturnSearchCatImage$page {
	id: number;
	caption: string;
	path: string;
	author: number;
	isValid: number;
}
export interface ResultSearchCatImage {
	$page: ReturnSearchCatImage$page[];
}

export interface ParamSearchImageCat {
	image: number;
}
export interface ReturnSearchImageCat$page {
	id: number;
	name: string;
}
export interface ResultSearchImageCat {
	$page: ReturnSearchImageCat$page[];
}

export interface ParamSearchSlideShow {
}
export interface ReturnSearchSlideShow$page {
	id: number;
	caption: string;
	description: string;
	image: number;
	path: string;
	author: number;
	src: string;
	sort: number;
	types: number;
}
export interface ResultSearchSlideShow {
	$page: ReturnSearchSlideShow$page[];
}

export interface ParamGetSlideShow {
}
export interface ReturnGetSlideShowRet {
	image: number;
	caption: string;
	path: string;
	author: number;
	description: string;
	src: string;
	sort: number;
	types: number;
}
export interface ResultGetSlideShow {
	ret: ReturnGetSlideShowRet[];
}

export interface ParamSearchBusinessScope {
}
export interface ReturnSearchBusinessScopeRet {
	webuser: number;
	businessScope: number;
}
export interface ResultSearchBusinessScope {
	ret: ReturnSearchBusinessScopeRet[];
}

export interface ParamSearchClassRoomPost {
	classroomType: number;
}
export interface ReturnSearchClassRoomPost$page {
	id: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	template: number;
	$update: any;
	$create: any;
	isValid: number;
	hits: number;
	sumHits: number;
	web: number;
	agent: number;
	assist: number;
	openweb: number;
}
export interface ResultSearchClassRoomPost {
	$page: ReturnSearchClassRoomPost$page[];
}

export interface ParamSearchPostDomain {
	_post: number;
}
export interface ReturnSearchPostDomainRet {
	post: number;
	domain: number;
}
export interface ResultSearchPostDomain {
	ret: ReturnSearchPostDomainRet[];
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamSearchDomainPost {
	key: string;
	author: number;
	domain: number;
	publish: number;
}
export interface ReturnSearchDomainPost$page {
	id: number;
	post: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	template: number;
	$update: any;
	$create: any;
	publishdate: any;
	isValid: number;
	emphasis: number;
	language: number;
	hits: number;
	sumHits: number;
	web: number;
	agent: number;
	assist: number;
	openweb: number;
	bvweb: number;
}
export interface ResultSearchDomainPost {
	$page: ReturnSearchDomainPost$page[];
}

export interface ParamSearchInformationPost {
}
export interface ReturnSearchInformationPost$page {
	id: number;
	post: number;
	caption: string;
	discription: string;
	image: number;
	author: number;
	$update: any;
	$create: any;
	publishdate: any;
	isValid: number;
	emphasis: number;
	language: number;
	web: number;
	agent: number;
	assist: number;
	openweb: number;
	bvweb: number;
	sort: number;
}
export interface ResultSearchInformationPost {
	$page: ReturnSearchInformationPost$page[];
}

export interface ParamSearchProductCategoryPostCount {
	productCategory: number;
}
export interface ReturnSearchProductCategoryPostCountRet {
	postcounts: number;
}
export interface ResultSearchProductCategoryPostCount {
	ret: ReturnSearchProductCategoryPostCountRet[];
}

export interface ParamSearchDomainPostCount {
	domain: number;
}
export interface ReturnSearchDomainPostCountRet {
	postcounts: number;
}
export interface ResultSearchDomainPostCount {
	ret: ReturnSearchDomainPostCountRet[];
}

export interface ParamSearchPostProduct {
	_post: number;
}
export interface ReturnSearchPostProductRet {
	post: number;
	product: number;
}
export interface ResultSearchPostProduct {
	ret: ReturnSearchPostProductRet[];
}

export interface ParamSearchAchievementOfTeamNew {
	_manage: number;
	_year: number;
	_type: string;
}
export interface ReturnSearchAchievementOfTeamNewRet {
	year: string;
	month: string;
	day: string;
	postPubSum: number;
	postTranSum: number;
	postHitSum: number;
	percent: number;
	hitWeb: number;
	hitAgent: number;
	hitAssist: number;
	hitEmail: number;
	hitOther: number;
}
export interface ResultSearchAchievementOfTeamNew {
	ret: ReturnSearchAchievementOfTeamNewRet[];
}

export interface ParamSearchRecommendProduct {
	post: number;
}
export interface ReturnSearchRecommendProductRet {
	id: number;
	no: string;
	brand: number;
	origin: string;
	description: string;
	descriptionc: string;
	imageurl: string;
	chemical: string;
	cas: string;
	purity: string;
	brandname: string;
}
export interface ResultSearchRecommendProduct {
	ret: ReturnSearchRecommendProductRet[];
}

export interface ParamSearchSubjectDefault {
	_businessScope: number;
}
export interface ReturnSearchSubjectDefaultRet {
	subject: number;
	$id: number;
}
export interface ResultSearchSubjectDefault {
	ret: ReturnSearchSubjectDefaultRet[];
}

export interface ParamGetProdoctDescription {
	post: number;
}
export interface ReturnGetProdoctDescriptionRet {
	product: number;
	$id: number;
}
export interface ResultGetProdoctDescription {
	ret: ReturnGetProdoctDescriptionRet[];
}

export interface ParamPostBrowsing {
}
export interface ReturnPostBrowsing$page {
	id: number;
	totalBrowsing: number;
}
export interface ResultPostBrowsing {
	$page: ReturnPostBrowsing$page[];
}

export interface ParamPageBrowsing {
}
export interface ReturnPageBrowsing$page {
	id: number;
	totalBrowsing: number;
}
export interface ResultPageBrowsing {
	$page: ReturnPageBrowsing$page[];
}

export interface ParamTotalBrowsing {
}
export interface ReturnTotalBrowsing$page {
	user: number;
	PostTotal: number;
	PageTotal: number;
}
export interface ResultTotalBrowsing {
	$page: ReturnTotalBrowsing$page[];
}

export interface ParamHot {
}
export interface ReturnHot$page {
	post: number;
	hits: number;
	sumHits: number;
}
export interface ResultHot {
	$page: ReturnHot$page[];
}

export interface ParamPostEvaluate {
}
export interface ReturnPostEvaluate$page {
	post: number;
	GradeA: number;
	GradeB: number;
	GradeC: number;
	GradeD: number;
	GradeE: number;
}
export interface ResultPostEvaluate {
	$page: ReturnPostEvaluate$page[];
}

export interface ParamAchievement {
	date: any;
	manage: number;
}
export interface ReturnAchievement$page {
	user: number;
	year: number;
	month: number;
	postPubSum: number;
	postTranSum: number;
	postHitSum: number;
	hitWeb: number;
	hitAgent: number;
	hitAssist: number;
	hitEmail: number;
	hitOther: number;
}
export interface ResultAchievement {
	$page: ReturnAchievement$page[];
}

export interface ParamWebPageHistory {
	webPage: number;
	object: number;
	objectType: string;
	description: string;
}
export interface ReturnWebPageHistory$page {
	date: any;
	webPage: number;
	object: number;
	objectType: string;
	description: string;
}
export interface ResultWebPageHistory {
	$page: ReturnWebPageHistory$page[];
}

export interface ParamPostBrowsingHistory {
	POST: number;
	ipAddress: string;
}
export interface ReturnPostBrowsingHistory$page {
	date: any;
	POST: number;
	ipAddress: string;
}
export interface ResultPostBrowsingHistory {
	$page: ReturnPostBrowsingHistory$page[];
}

export interface ParamPageBrowsingHistory {
	WebPage: number;
	ipAddress: string;
}
export interface ReturnPageBrowsingHistory$page {
	date: any;
	WebPage: number;
	ipAddress: string;
}
export interface ResultPageBrowsingHistory {
	$page: ReturnPageBrowsingHistory$page[];
}

export interface ParamHits {
	ip: number;
	post: number;
	sales: number;
	source: number;
	hit: number;
}
export interface ReturnHits$page {
	date: any;
	ip: number;
	post: number;
	sales: number;
	source: number;
	hit: number;
}
export interface ResultHits {
	$page: ReturnHits$page[];
}

export interface ParamPostEvaluateRecord {
	post: number;
	ip: number;
	grade: number;
}
export interface ReturnPostEvaluateRecord$page {
	date: any;
	post: number;
	ip: number;
	grade: number;
}
export interface ResultPostEvaluateRecord {
	$page: ReturnPostEvaluateRecord$page[];
}

export interface $Piecewise {
	id?: number;
	name: string;
	ratio: number;
	offset: number;
	asc: number;
}

export interface $PiecewiseDetail {
	id?: number;
	parent: number;
	row?: number;
	sec: number;
	value: number;
}

export interface ParamActs {
	$Piecewise?: $Piecewise[];
	$PiecewiseDetail?: $PiecewiseDetail[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	Tag: UqTuid<TuidTag>;
	$sheet: UqTuid<Tuid$sheet>;
	Template: UqTuid<TuidTemplate>;
	Content: UqTuid<TuidContent>;
	POST: UqTuid<TuidPOST>;
	IMAGE: UqTuid<TuidIMAGE>;
	BRANCH: UqTuid<TuidBRANCH>;
	WebPage: UqTuid<TuidWebPage>;
	Ip: UqTuid<TuidIp>;
	Brand: UqTuid<TuidBrand>;
	ProductX: UqTuid<TuidProductX>;
	ProductCategory: UqTuid<TuidProductCategory>;
	Subject: UqTuid<TuidSubject>;
	IMGCat: UqTuid<TuidIMGCat>;
	BusinessScope: UqTuid<TuidBusinessScope>;
	ClassroomType: UqTuid<TuidClassroomType>;
	Domain: UqTuid<TuidDomain>;
	Website: UqTuid<TuidWebsite>;
	MadiaType: UqTuid<TuidMadiaType>;
	Test: UqAction<ParamTest, ResultTest>;
	PublishPost: UqAction<ParamPublishPost, ResultPublishPost>;
	AddBrowsingHistory: UqAction<ParamAddBrowsingHistory, ResultAddBrowsingHistory>;
	Hit: UqAction<ParamHit, ResultHit>;
	CalcHot: UqAction<ParamCalcHot, ResultCalcHot>;
	PublishPostForProduct: UqAction<ParamPublishPostForProduct, ResultPublishPostForProduct>;
	AddPostEvaluate: UqAction<ParamAddPostEvaluate, ResultAddPostEvaluate>;
	AddPostResearchField: UqAction<ParamAddPostResearchField, ResultAddPostResearchField>;
	AddPost: UqAction<ParamAddPost, ResultAddPost>;
	AddPostProductCatalog: UqAction<ParamAddPostProductCatalog, ResultAddPostProductCatalog>;
	AddPostSubject: UqAction<ParamAddPostSubject, ResultAddPostSubject>;
	AddPostProductCatalogExplain: UqAction<ParamAddPostProductCatalogExplain, ResultAddPostProductCatalogExplain>;
	TransmitPost: UqAction<ParamTransmitPost, ResultTransmitPost>;
	UpdateSlideShow: UqAction<ParamUpdateSlideShow, ResultUpdateSlideShow>;
	DeleteSlideShow: UqAction<ParamDeleteSlideShow, ResultDeleteSlideShow>;
	AddPostDomain: UqAction<ParamAddPostDomain, ResultAddPostDomain>;
	AddInformationPost: UqAction<ParamAddInformationPost, ResultAddInformationPost>;
	DelPostSubject: UqAction<ParamDelPostSubject, ResultDelPostSubject>;
	HitOfManual: UqAction<ParamHitOfManual, ResultHitOfManual>;
	DelSubjectDefault: UqAction<ParamDelSubjectDefault, ResultDelSubjectDefault>;
	PostBrowsing: UqBook<ParamPostBrowsing, ResultPostBrowsing>;
	PageBrowsing: UqBook<ParamPageBrowsing, ResultPageBrowsing>;
	TotalBrowsing: UqBook<ParamTotalBrowsing, ResultTotalBrowsing>;
	Hot: UqBook<ParamHot, ResultHot>;
	PostEvaluate: UqBook<ParamPostEvaluate, ResultPostEvaluate>;
	Achievement: UqBook<ParamAchievement, ResultAchievement>;
	SearchPost: UqQuery<ParamSearchPost, ResultSearchPost>;
	SearchTemplate: UqQuery<ParamSearchTemplate, ResultSearchTemplate>;
	SearchImage: UqQuery<ParamSearchImage, ResultSearchImage>;
	SearchWebPage: UqQuery<ParamSearchWebPage, ResultSearchWebPage>;
	SearchBranch: UqQuery<ParamSearchBranch, ResultSearchBranch>;
	SearchPrivateBranch: UqQuery<ParamSearchPrivateBranch, ResultSearchPrivateBranch>;
	SearchTotalBrowsing: UqQuery<ParamSearchTotalBrowsing, ResultSearchTotalBrowsing>;
	HotPosts: UqQuery<ParamHotPosts, ResultHotPosts>;
	SearchPostPublish: UqQuery<ParamSearchPostPublish, ResultSearchPostPublish>;
	SearchPostPublishForProduct: UqQuery<ParamSearchPostPublishForProduct, ResultSearchPostPublishForProduct>;
	SearchPostEvaluate: UqQuery<ParamSearchPostEvaluate, ResultSearchPostEvaluate>;
	SearchPostResearchField: UqQuery<ParamSearchPostResearchField, ResultSearchPostResearchField>;
	SearchAchievement: UqQuery<ParamSearchAchievement, ResultSearchAchievement>;
	SearchProductCategoryPost: UqQuery<ParamSearchProductCategoryPost, ResultSearchProductCategoryPost>;
	SearchSubject: UqQuery<ParamSearchSubject, ResultSearchSubject>;
	SearchSubjectPost: UqQuery<ParamSearchSubjectPost, ResultSearchSubjectPost>;
	SearchPostSubject: UqQuery<ParamSearchPostSubject, ResultSearchPostSubject>;
	SearchPostCatalog: UqQuery<ParamSearchPostCatalog, ResultSearchPostCatalog>;
	SearchPostCatalogExplain: UqQuery<ParamSearchPostCatalogExplain, ResultSearchPostCatalogExplain>;
	SearchAchievementOfTeamDetail: UqQuery<ParamSearchAchievementOfTeamDetail, ResultSearchAchievementOfTeamDetail>;
	SearchAchievementOfTeam: UqQuery<ParamSearchAchievementOfTeam, ResultSearchAchievementOfTeam>;
	SearchCat: UqQuery<ParamSearchCat, ResultSearchCat>;
	SearchCatImage: UqQuery<ParamSearchCatImage, ResultSearchCatImage>;
	SearchImageCat: UqQuery<ParamSearchImageCat, ResultSearchImageCat>;
	SearchSlideShow: UqQuery<ParamSearchSlideShow, ResultSearchSlideShow>;
	GetSlideShow: UqQuery<ParamGetSlideShow, ResultGetSlideShow>;
	SearchBusinessScope: UqQuery<ParamSearchBusinessScope, ResultSearchBusinessScope>;
	SearchClassRoomPost: UqQuery<ParamSearchClassRoomPost, ResultSearchClassRoomPost>;
	SearchPostDomain: UqQuery<ParamSearchPostDomain, ResultSearchPostDomain>;
	$poked: UqQuery<Param$poked, Result$poked>;
	SearchDomainPost: UqQuery<ParamSearchDomainPost, ResultSearchDomainPost>;
	SearchInformationPost: UqQuery<ParamSearchInformationPost, ResultSearchInformationPost>;
	SearchProductCategoryPostCount: UqQuery<ParamSearchProductCategoryPostCount, ResultSearchProductCategoryPostCount>;
	SearchDomainPostCount: UqQuery<ParamSearchDomainPostCount, ResultSearchDomainPostCount>;
	SearchPostProduct: UqQuery<ParamSearchPostProduct, ResultSearchPostProduct>;
	SearchAchievementOfTeamNew: UqQuery<ParamSearchAchievementOfTeamNew, ResultSearchAchievementOfTeamNew>;
	SearchRecommendProduct: UqQuery<ParamSearchRecommendProduct, ResultSearchRecommendProduct>;
	SearchSubjectDefault: UqQuery<ParamSearchSubjectDefault, ResultSearchSubjectDefault>;
	GetProdoctDescription: UqQuery<ParamGetProdoctDescription, ResultGetProdoctDescription>;
	ContentTag: UqMap;
	WebPageBranch: UqMap;
	Hitted: UqMap;
	PostPublish: UqMap;
	PostPublishProduct: UqMap;
	PostResearchField: UqMap;
	PostProductCatalog: UqMap;
	PostSubject: UqMap;
	PostProductCatalogExplain: UqMap;
	ImageCat: UqMap;
	SlideShow: UqMap;
	WebUserBusinessScope: UqMap;
	PostClassroomType: UqMap;
	PostDomain: UqMap;
	WebPageWebsite: UqMap;
	InformationPost: UqMap;
	PostProduct: UqMap;
	SubjectDefault: UqMap;
	PostStatus: UqMap;
	PostPage: UqMap;
	ProductDescriptionPost: UqMap;
	WebPageHistory: UqHistory<ParamWebPageHistory, ResultWebPageHistory>;
	PostBrowsingHistory: UqHistory<ParamPostBrowsingHistory, ResultPostBrowsingHistory>;
	PageBrowsingHistory: UqHistory<ParamPageBrowsingHistory, ResultPageBrowsingHistory>;
	Hits: UqHistory<ParamHits, ResultHits>;
	PostEvaluateRecord: UqHistory<ParamPostEvaluateRecord, ResultPostEvaluateRecord>;
	$Piecewise: UqID<any>;
	$PiecewiseDetail: UqID<any>;
}
