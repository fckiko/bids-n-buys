import AWS from "aws-sdk";
import { Schema } from "mongoose";
import { v4 } from "uuid";
import { Ref, prop, post, modelOptions, getModelForClass, DocumentType } from "@typegoose/typegoose";
import { ProductItem } from "./product-item";

const kinesis = new AWS.Kinesis({ region: "ap-southeast-1" });
const PartitionKey = "demo-druiddata";
const StreamName = "demo-druiddata";
const STAGE = process.env.STAGE || "dev";

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

const initializeMetrics = (): Record<AnalyticsMetric, number> => {
    return Object.values(AnalyticsMetric).reduce((acc, metric) => {
        acc[metric] = 0;
        return acc;
    }, {} as Record<AnalyticsMetric, number>);
}

const initializeStatuses = (): Record<AnalyticsStatus, string> => {
    return Object.values(AnalyticsStatus).reduce((acc, status) => {
        acc[status] = STAGE;
        return acc;
    }, {} as Record<AnalyticsStatus, string>);
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

    @prop({ type: Date, default: Date.now })
    firstVisit?: Date;

    @prop({ type: Number, default: 0 })
    longitude?: number;

    @prop({ type: Number, default: 0 })
    latitude?: number;

    @prop({ type: String, default: "" })
    searchedItems?: string;

    @prop({ required: true, type: Schema.Types.ObjectId, ref: ProductItem })
    productItemId!: Ref<ProductItem>;

    @prop({ default: () => STAGE, type: String })
    branch!: string;

    @prop({ type: String, default: "" })
    ipAddress?: string;

    @prop({ type: Schema.Types.Mixed, default: {} })
    other?: Schema.Types.Mixed;

    @prop({ type: String, enum: ["Referral", "DirectSearch", "Email", "OrganicSearch", "OrganicSocial", "Unassigned"], default: "Unassigned" })
    source?: string;

    @prop({ type: Schema.Types.ObjectId, ref: 'BrevoEmail' })
    brevoEmailId?: Ref<BrevoEmail>;

    @prop({ type: Schema.Types.ObjectId, ref: 'SendGridEmail' })
    sendGridEmailId?: Ref<SendGridEmail>;

    @prop({ type: Schema.Types.ObjectId, ref: 'AWSESEmail' })
    awsSESEmailId?: Ref<AWSESEmail>;

    @prop({ type: () => Object, default: initializeMetrics })
    metrics!: Record<AnalyticsMetric, number>;

    @prop({ type: () => Object, default: initializeStatuses })
    statuses!: Record<AnalyticsStatus, string>;
}

export const ProductAnalyticsModel = getModelForClass(ProductAnalytics, { schemaOptions: { timestamps: true } });
