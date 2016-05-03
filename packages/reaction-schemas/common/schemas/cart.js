/**
 * CartItem Schema
 */

ReactionCore.Schemas.CartItem = new SimpleSchema({
  _id: {
    type: String
  },
  productId: {
    type: String,
    index: 1
  },
  shopId: {
    type: String,
    autoValue: ReactionCore.shopIdAutoValue,
    index: 1,
    label: "Cart Item shopId",
    optional: true
  },
  quantity: {
    label: "Quantity",
    type: Number,
    min: 0
  },
  variants: {
    type: ReactionCore.Schemas.ProductVariant
  },
  title: {
    type: String
  },
  type: {
    label: "Product Type",
    type: String,
    optional: true
  }
});

/**
 * Order Notes Schema
 */
// this schema temporary here. Currently without it is impossible to insert notes
// in cart object. Latter we will import Notes schema from other file.
ReactionCore.Schemas.Notes = new SimpleSchema({
  _id: {
    type: String
  },
  content: {
    type: String
  },
  userId: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});

/**
 * CartItem Schema
 * used in check by inventory/addReserve method
 */

ReactionCore.Schemas.CartItems = new SimpleSchema({
  items: {
    type: [ReactionCore.Schemas.CartItem],
    optional: true
  }
});

/**
 * Cart Schema
 */

ReactionCore.Schemas.Cart = new SimpleSchema({
  shopId: {
    type: String,
    autoValue: ReactionCore.shopIdAutoValue,
    index: 1,
    label: "Cart ShopId"
  },
  userId: {
    type: String,
    unique: true,
    autoValue: function () {
      if (this.isInsert || this.isUpdate) {
        if (!this.isFromTrustedCode) {
          return this.userId;
        }
      } else {
        this.unset();
      }
    }
  },
  sessionId: {
    type: String,
    index: 1
  },
  email: {
    type: String,
    optional: true,
    index: 1,
    regEx: SimpleSchema.RegEx.Email
  },
  items: {
    type: [ReactionCore.Schemas.CartItem],
    optional: true
  },
  shipping: {
    type: [ReactionCore.Schemas.Shipment],
    optional: true,
    blackbox: true
  },
  billing: {
    type: [ReactionCore.Schemas.Payment],
    optional: true,
    blackbox: true
  },
  notes: {
    type: [ReactionCore.Schemas.Notes],
    optional: true
  },
  workflow: {
    type: ReactionCore.Schemas.Workflow,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    },
    denyUpdate: true
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return {
          $set: new Date
        };
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    },
    optional: true
  }
});
