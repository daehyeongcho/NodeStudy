const models = require('../../models')

exports.get_apts = async (_, res) => {
  const apts = await models.Apts.findAll({}) // DB에서 받은 apts
  res.render('admin/apts.html', { apts: apts })
}

exports.get_apts_write = (_, res) => {
  res.render('admin/write.html')
}

exports.post_apts_write = async (req, res) => {
  req.body.geo = {
    type: 'Point',
    coordinates: req.body.geo.split(',').slice(0, 2) // 경도, 위도
  }

  await models.Apts.create(req.body)
  res.redirect('/admin/apts')
}

exports.get_apts_detail = async (req, res) => {
  const apt = await models.Apts.findByPk(req.params.id)
  res.render('admin/detail.html', { apt: apt })
}

exports.get_apts_edit = async (req, res) => {
  const apt = await models.Apts.findByPk(req.params.id)
  res.render('admin/write.html', { apt: apt })
}

exports.post_apts_edit = async (req, res) => {
  req.body.geo = {
    type: 'Point',
    coordinates: req.body.geo.split(',').slice(0, 2)
  }

  await models.Apts.update(req.body, {
    where: { id: req.params.id }
  })
  res.redirect('/admin/apts/detail/' + req.params.id)
}

exports.get_apts_delete = async (req, res) => {
  await models.Apts.destroy({
    where: {
      id: req.params.id
    }
  })
  res.redirect('/admin/apts')
}
