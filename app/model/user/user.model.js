const mongose = require("../../services/mongoose.service");
const Schema = mongose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    following:[
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    tweets: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("id").get(function() {
    return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.findById = function (cb){
  return this.model("Users").find({id : this.id}, cb);
}

const User = mongoose.model("Users", userSchema);


exports.findByEmail = (email) => {
  return User.find({ email: email });
};

exports.findById = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    delete result.password;
    return result;
  });
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate(
    {
      _id: id,
    },
    userData
  );
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ _id: userId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};