import AWS from "aws-sdk";
import { Schema } from "mongoose";
import { v4 } from "uuid";
 
import { Ref, prop, post, modelOptions, getModelForClass, DocumentType } from "@typegoose/typegoose";
 
const kinesis = new AWS.Kinesis({ region: "ap-southeast-1" });
const PartitionKey = "demo-druiddata";
const StreamName = "demo-druiddata";
const STAGE = process.env.STAGE || "dev";
 
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
// Google Analytics Start
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
    payment_methods?: number;
 
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
 
    @prop({ required: true, type: Schema.Types.ObjectId })
    productItemId!: Ref<any>;
 
    //Google Analytics End
 
    //Nika's Variable Start
    @prop({ default: () => STAGE, type: String })
    signupFail?: string;
 
    @prop({ default: () => STAGE, type: String })
    forgotpasswordFail?: string;
 
    @prop({ default: () => STAGE, type: String })
    requestNewTotpFail?: string;
 
    //Nika's Variable End
 
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
}
 
export const ProductAnalyticsModel = getModelForClass(ProductAnalytics, { schemaOptions: { timestamps: true } });