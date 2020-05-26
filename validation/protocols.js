const removeProtocols = text => text.replace(/(^\w+:|^)\/\//, '')

module.exports = removeProtocols
