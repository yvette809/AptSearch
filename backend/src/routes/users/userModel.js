const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    role:{
      type:String,
      default:'landlord',
    },
    bio: {
        type: String,
        
      },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// we encrypt password before save
userSchema.pre("save", async function (next) {
  // we only want to hash the password if the user is modified
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
