const Typograf = require('typograf')

const tp = new Typograf({ locale: ['ru', 'en-GB'] })
tp.enableRule('common/html/url')

module.exports = tp
