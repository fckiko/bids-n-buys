import AWS from "aws-sdk";
import { Schema } from "mongoose";
import { v4 } from "uuid";
import { Ref, prop, post, modelOptions, getModelForClass, DocumentType } from "@typegoose/typegoose";
import { ProductItem } from "./product-item";
 
const kinesis = new AWS.Kinesis({ region: "ap-southeast-1" });
const PartitionKey = "demo-druiddata";
const StreamName = "demo-druiddata";
const STAGE = process.env.STAGE || "dev";


// Email Service Providers Start
export class BrevoEmail {
    @prop({ default: () => v4(), unique: true, type: String })
    emailId!: string;

    @prop({ required: true, type: String })
    to!: string;

    @prop({ required: true, type: String })
    from!: string;

    @prop({ required: true, type: String })
    subject!: string;

    @prop({ required: true, type: Date, default: Date.now })
    sentAt!: Date;

    @prop({ type: Boolean, default: false })
    opened?: boolean;

    @prop({ type: Boolean, default: false })
    clicked?: boolean;

    @prop({ type: String, default: "" })
    status?: string;

    @prop({ type: Schema.Types.ObjectId })
    productAnalyticsId?: Ref<ProductAnalytics>;
}

export const BrevoEmailModel = getModelForClass(BrevoEmail, { schemaOptions: { timestamps: true } });


export class SendGridEmail {
    @prop({ default: () => v4(), unique: true, type: String })
    emailId!: string;

    @prop({ required: true, type: String })
    to!: string;

    @prop({ required: true, type: String })
    from!: string;

    @prop({ required: true, type: String })
    subject!: string;

    @prop({ required: true, type: Date, default: Date.now })
    sentAt!: Date;

    @prop({ type: Boolean, default: false })
    opened?: boolean;

    @prop({ type: Boolean, default: false })
    clicked?: boolean;

    @prop({ type: String, default: "" })
    status?: string;

    @prop({ type: Schema.Types.ObjectId })
    productAnalyticsId?: Ref<ProductAnalytics>;
}

export const SendGridEmailModel = getModelForClass(SendGridEmail, { schemaOptions: { timestamps: true } });


export class AWSESEmail {
    @prop({ default: () => v4(), unique: true, type: String })
    emailId!: string;

    @prop({ required: true, type: String })
    to!: string;

    @prop({ required: true, type: String })
    from!: string;

    @prop({ required: true, type: String })
    subject!: string;

    @prop({ required: true, type: Date, default: Date.now })
    sentAt!: Date;

    @prop({ type: Boolean, default: false })
    opened?: boolean;

    @prop({ type: Boolean, default: false })
    clicked?: boolean;

    @prop({ type: String, default: "" })
    status?: string;

    @prop({ type: Schema.Types.ObjectId })
    productAnalyticsId?: Ref<ProductAnalytics>;
}

// Email Service Providers End

export const AWSESEmailModel = getModelForClass(AWSESEmail, { schemaOptions: { timestamps: true } });

enum AnalyticsMetric {
    PageViews = "pageViews",
    UserEngagement = "userEngagement",
    SessionStartCount = "sessionStartCount",
    SocialShare = "socialShare",
    FormStart = "formStart",
    Views = "views",
    SignIn = "signIn",
    AddToCart = "addToCart",
    BiddingSales = "biddingSales",
    BuyingSales = "buyingSales",
    UpdateProfile = "updateProfile",
    VerifyEmail = "verifyEmail",
    SendQR = "sendQR",
    SendPin = "sendPin",
    ViewItems = "viewItems",
    CreateBids = "createBids",
    CreateOffer = "createOffer",
    CreateBuy = "createBuy",
    PaypalMethod = "paypalMethod",
    StripesMethod = "stripesMethod",
    PlaceOrder = "placeOrder",
    CheckOut = "checkOut",
    PurchaseItem = "purchaseItem",
    UserProfile = "userProfile",
    Search = "search",
    BrevoEmailId = "brevoEmailId",
    SendGridEmailId = "sendGridEmailId",
    AwsSesEmailId = "awsSESEmailId",
    CheckTermsPage = "checkTermsPage",
    CheckContactPage = "checkContactPage",
    ContactUs = "contactUs",
    Signup = "signup",
    ContactUsFail = "contactUsFail",
    RequestNewTotpFail = "requestNewTotpFail",
    Login = "login",
    LogOut = "logOut",
    LoginFails = "loginFails",
}
 
enum AnalyticsStatus {
    SignupFail = "signupFail",
    ForgotPasswordFail = "forgotpasswordFail",
}
 
const pushtoKinesis = async (doc: DocumentType<ProductAnalytics>) =>
    await kinesis
        .putRecord({
            StreamName,
            PartitionKey,
            Data: JSON.stringify(doc),
        })
        .promise();
 
@post<ProductAnalytics>("save", async function (doc) {
    if (doc) return await pushtoKinesis(doc).then(console.log).catch(console.error);
})
@post<ProductAnalytics>("findOneAndUpdate", async function (doc) {
    if (doc) return await pushtoKinesis(doc).then(console.log).catch(console.error);
})
@modelOptions({ options: { allowMixed: 0, customName: "ProductAnalytics" } })
export class ProductAnalytics {
    @prop({ default: () => v4(), unique: true, type: String })
    analyticsId!: string;
 
    @prop({ type: String, default: "" })
    googleTags?: string;
 
    @prop({ type: String, default: "" })
    getStarted?: string;
 
    @prop({ type: Date, required: true, default: Date.now })
    sessionStart!: Date;
 
    @prop({ type: String, default: "" })
    sessionId?: string;
 
    @prop({ type: Number, default: 0 })
    pageViews?: number;
 
    @prop({ type: Number, default: 0 })
    userEngagement?: number;
 
    @prop({ type: Number, default: 0 })
    sessionStartCount?: number;
 
    @prop({ type: Number, default: 0 })
    socialShare?: number;
 
    @prop({ type: Date, default: Date.now })
    firstVisit?: Date;
 
    @prop({ type: Number, default: 0 })
    formStart?: number;
 
    @prop({ type: Number, default: 0 })
    views?: number;
 
    @prop({ type: Number, default: 0 })
    signIn?: number;
 
    @prop({ type: Number, default: 0 })
    addToCart?: number;
 
    @prop({ type: Number, default: 0 })
    biddingSales?: number;
 
    @prop({ type: Number, default: 0 })
    buyingSales?: number;
 
    @prop({ type: Number, default: 0 })
    updateProfile?: number;
 
    @prop({ type: Number, default: 0 })
    verifyEmail?: number;
 
    @prop({ type: Number, default: 0 })
    sendQR?: number;
 
    @prop({ type: Number, default: 0 })
    sendPin?: number;
 
    @prop({ type: Number, default: 0 })
    viewItems?: number;
 
    @prop({ type: Number, default: 0 })
    createBids?: number;
 
    @prop({ type: Number, default: 0 })
    createOffer?: number;
 
    @prop({ type: Number, default: 0 })
    createBuy?: number;
 
    @prop({ type: Number, default: 0 })
    paypalMethod?: number;
 
    @prop({ type: Number, default: 0 })
    stripesMethod?: number;
 
    @prop({ type: Number, default: 0 })
    placeOrder?: number;
 
    @prop({ type: Number, default: 0 })
    checkOut?: number;
 
    @prop({ type: Number, default: 0 })
    purchaseItem?: number;
 
    @prop({ type: Number, default: 0 })
    userProfile?: number;
 
    @prop({ type: Number, default: 0 })
    longitude?: number;
 
    @prop({ type: Number, default: 0 })
    latitude?: number;
 
    @prop({ type: Number, default: 0 })
    search?: number;
 
    @prop({ type: String, default: "" })
    searchedItems?: string;
 
    @prop({ type: Number, default: 0 })
    checkTermsPage?: number;
 
    @prop({ type: Number, default: 0 })
    checkContactPage?: number;
 
    @prop({ type: Number, default: 0 })
    contactUs?: number;
 
    @prop({ type: Number, default: 0 })
    signup?: number;
 
    @prop({ type: Number, default: 0 })
    contactUsFail?: number;
 
    @prop({ required: true, type: Schema.Types.ObjectId })
    productItemId!: Ref<ProductItem>;
 
    @prop({ default: () => STAGE, type: String })
    signupFail?: string;
 
    @prop({ default: () => STAGE, type: String })
    forgotpasswordFail?: string;
 
    @prop({ type: Number, default: 0 })
    requestNewTotpFail?: number;
 
    @prop({ default: () => STAGE, type: String })
    branch!: string;
 
    @prop({ type: Number, default: 0 })
    login?: number;
 
    @prop({ type: Number, default: 0 })
    logOut?: number;
 
    @prop({ type: Number, default: 0 })
    loginFails?: number;
 
    @prop({ type: String, default: "" })
    ipAddress?: string;
 
    @prop({ type: Schema.Types.Mixed, default: {} })
    other?: Schema.Types.Mixed;
    
    //Newly added for Email provider
    @prop({ type: String, enum: ["Referral", "DirectSearch", "Email", "OrganicSearch", "OrganicSocial", "Unassigned"], default: "Unassigned" })
    source?: string;
    // Email service fields
    @prop({ type: Schema.Types.ObjectId, ref: 'BrevoEmail' })
    brevoEmailId?: Ref<BrevoEmail>;

    @prop({ type: Schema.Types.ObjectId, ref: 'SendGridEmail' })
    sendGridEmailId?: Ref<SendGridEmail>;

    @prop({ type: Schema.Types.ObjectId, ref: 'AWSESEmail' })
    awsSESEmailId?: Ref<AWSESEmail>;
    //End


    // Use enum for metrics
    @prop({ type: () => Object, default: {} })
    metrics: Record<AnalyticsMetric, number> = Object.values(AnalyticsMetric).reduce((acc, metric) => {
        acc[metric] = 0;
        return acc;
    }, {} as Record<AnalyticsMetric, number>);
 
    // Use enum for statuses
    @prop({ type: () => Object, default: {} })
    statuses: Record<AnalyticsStatus, string> = Object.values(AnalyticsStatus).reduce((acc, status) => {
        acc[status] = STAGE;
        return acc;
    }, {} as Record<AnalyticsStatus, string>);
}
 
export const ProductAnalyticsModel = getModelForClass(ProductAnalytics, { schemaOptions: { timestamps: true } });