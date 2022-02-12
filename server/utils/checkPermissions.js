module.exports = function checkPermissions(requestUser, resourceUserId)  {
  // if (requestUser.role === 'admin') return
  if (requestUser.userId === resourceUserId.toString()) return
  throw new Error('Not authorized to access this route')
}
