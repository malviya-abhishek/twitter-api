const mongose = require("../../services/mongoose.service");
const Schema = mongose.Schema;


const tweetSchema = new Schema(
  {
    userId: {
      type: mongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tweet: {
      type: String,
      required: true,
      maxLength: 140,
    },
    tags:[{ type : String }]
  },
  {
    timestamps: true,
  }
);


tweetSchema.virtual("id").get(function(){
    return this._id.toHexString();
});


tweetSchema.set("toJSON", {
    virtual: true
});

tweetSchema.findById = function (cb) {
    return this.model("Tweets").find({id: this.id}, cb);
};

const Tweet = mongose.model("Tweets", tweetSchema);

exports.findById = (id) => {
    return Tweet.findById(id).then( (result) =>{
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    } )
}

