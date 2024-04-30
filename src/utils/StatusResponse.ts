const StatusResponse = (
  status_code = 200,
  message = 'success',
  success = true
) => {
  return { status_code, message, success }
}
export default StatusResponse
