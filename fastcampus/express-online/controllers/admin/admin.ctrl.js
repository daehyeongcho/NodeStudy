exports.get_products = (_, res) => {
  res.render('admin/products.html', {
    message: '<h1>태그가 출력됩니다.</h1>',
    online: 'express'
  })
}

exports.get_products_write = (_, res) => {
  res.render('admin/write.html')
}

exports.post_products_write = (req, res) => {
  res.send(req.body)
}
