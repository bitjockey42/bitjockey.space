const slugify = require("slugify")
module.exports = title => `/garden/${slugify(title)}`
