const models = require('../../models')

exports.get_products = (_, res) => {
  // res.render(
  //   "admin/products.html",
  //   { message: "hello" } // message 란 변수를 템플릿으로 내보낸다.
  // );

  models.Products.findAll({}).then((products) => {
    res.render('admin/products.html', { products })
  })
}

exports.get_products_write = (_, res) => {
  res.render('admin/write.html')
}

exports.post_products_write = (req, res) => {
  // res.send(req.body);
  models.Products.create(req.body).then(() => {
    res.redirect('/admin/products')
  })
}

exports.get_products_detail = (req, res) => {
  // req.params.id
  models.Products.findByPk(req.params.id).then((product) => {
    res.render('admin/detail.html', { product })
  })
}

exports.get_products_edit = (req, res) => {
  models.Products.findByPk(req.params.id).then((product) => {
    res.render('admin/write.html', { product })
  })
}

exports.post_products_edit = (req, res) => {
  models.Products.update(
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    },
    {
      where: { id: req.params.id }
    }
  ).then(() => {
    res.redirect('/admin/products/detail/' + req.params.id)
  })
}

exports.get_products_delete = (req, res) => {
  models.Products.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.redirect('/admin/products')
  })
}
