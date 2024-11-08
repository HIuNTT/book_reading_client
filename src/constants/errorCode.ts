export enum ErrorEnum {
  UNKNOWN = 'Lỗi không xác định. Vui lòng thử lại!',
  INVALID_TOKEN = 'Token không hợp lệ. Vui lòng đăng nhập lại!',
  ACCESS_DENIED = 'Không có quyền truy cập!',
  BAD_CREDENTIALS = 'Sai thông tin đăng nhập',
  UNAUTHORIZED = 'Vui lòng đăng nhập để tiếp tục!',
  MISSING_PARAMETER = 'Thiếu dữ liệu',
  INVALID_INPUT_DATA = 'Dữ liệu không hợp lệ',
  ENTITY_NOT_FOUND = 'Không tìm thấy',
  ENTITY_WAS_DELETED = 'Đã xóa',
  USER_NOT_FOUND = 'Người dùng không tồn tại',
  USERNAME_EXISTED = 'Tên đăng nhập đã được sử dụng',
  ENTITY_EXISTED = 'Đã tồn tại',
}
