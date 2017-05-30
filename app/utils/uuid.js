let _globalUid = 0

export default (prefix) => '__' + prefix + '__' + (++_globalUid)