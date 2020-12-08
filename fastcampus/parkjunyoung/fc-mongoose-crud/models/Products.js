const mongoose = require('mongoose')
const { Schema } = mongoose
const moment = require('moment-timezone')

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '제품명을 입력해주세요.']
    },
    price: Number,
    description: String,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  { collection: 'Products' } // 이 옵션 안넣으면 mongoose에서 이름 맘대로 지음(모델명 + 앞에 소문자 + 복수형)
)

ProductsSchema.methods.dateFormat = () => {
  return moment(this.createdAt)
    .tz('Asia/Seoul')
    .format('MMMM Do YYYY, h:mm:ss a')
}

module.exports = mongoose.model('Products', ProductsSchema)
