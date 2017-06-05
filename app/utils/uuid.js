let globalUid = 0

export default (prefix) => '__' + prefix + '__' + (++globalUid)
