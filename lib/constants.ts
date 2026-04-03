/**
 * Shared application constants.
 * All hardcoded strings, contact info, brand names and UI tokens live here.
 * Values are read from environment variables at runtime where possible,
 * falling back to the defaults defined in next.config.mjs → env.
 */

// ─── Brand ────────────────────────────────────────────────────────────────────

export const APP_NAME = process.env.APP_NAME || 'BM Group'
export const COMPANY_NAME = process.env.COMPANY_NAME || 'CÔNG TY TNHH DỊCH VỤ VIỆC LÀM BÌNH MINH GROUP'
export const COMPANY_DESC = process.env.COMPANY_DESC || 'Việc Chất, Lương Chuẩn, Tương Lai Vững Vàng'

// ─── Contact ──────────────────────────────────────────────────────────────────

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'tuyendung@bm-group.info.vn'
export const CONTACT_PHONE = process.env.CONTACT_PHONE || '0988 108 250'
export const CONTACT_ADDRESS = process.env.CONTACT_ADDRESS || 'Địa chỉ đang cập nhật'

// ─── Links & SEO ──────────────────────────────────────────────────────────────

export const SITE_URL = process.env.SITE_URL || 'https://bm-group.info.vn'
export const FB_PAGE_URL = process.env.FB_PAGE_URL || 'https://facebook.com'
export const ZALO_URL = process.env.ZALO_URL || 'https://zalo.me'

// ─── SEO / Metadata helpers ───────────────────────────────────────────────────

export const SITE_TITLE_SUFFIX = `| ${APP_NAME}`

export const META = {
  home: {
    title: `Trang Chủ ${SITE_TITLE_SUFFIX}`,
    description: COMPANY_DESC,
  },
  jobs: {
    title: `Cơ Hội Việc Làm ${SITE_TITLE_SUFFIX}`,
    description:
      'Tìm kiếm việc làm phổ thông lương cao, môi trường tốt, nhận việc nhanh trong 48h.',
  },
  blog: {
    title: `Góc Chia Sẻ ${SITE_TITLE_SUFFIX}`,
    description:
      'Kinh nghiệm tìm việc, mẹo phỏng vấn và các kỹ năng sống dành cho người lao động phổ thông.',
  },
  about: {
    title: `Giới thiệu ${SITE_TITLE_SUFFIX}`,
    description: `Tìm hiểu về sứ mệnh và quy trình tuyển dụng tại ${APP_NAME} - Chuyên tuyển dụng lao động phổ thông uy tín.`,
  },
  contact: {
    title: `Liên hệ & Ứng tuyển ${SITE_TITLE_SUFFIX}`,
    description: `Gửi hồ sơ ứng tuyển hoặc liên hệ trực tiếp với ${APP_NAME} để nhận việc làm nhanh chóng.`,
  },
} as const

// ─── Page Header copy ─────────────────────────────────────────────────────────

export const PAGE_HEADERS = {
  jobs: {
    title: 'Cơ Hội Việc Làm',
    subtitle:
      'Kết nối bạn với các doanh nghiệp uy tín. Việc làm thật, lương thật, nhận việc nhanh trong 48h.',
  },
  blog: {
    title: 'Góc Chia Sẻ',
    subtitle:
      'Kinh nghiệm tìm việc, mẹo phỏng vấn và các kỹ năng sống dành cho người lao động phổ thông.',
  },
  about: {
    title: `Giới thiệu ${APP_NAME}`,
    subtitle:
      'Chuyên tuyển dụng lao động phổ thông, nhân viên kho bãi và sản xuất hàng đầu cho các tập đoàn công nghiệp lớn.',
  },
  contact: {
    title: 'Liên hệ & Ứng tuyển',
    subtitle:
      'Chúng tôi luôn sẵn sàng hỗ trợ bạn tìm được công việc phù hợp nhất. Phản hồi nhanh trong vòng 24h.',
  },
} as const

// ─── Email template ───────────────────────────────────────────────────────────

export const APPLY_EMAIL_SUBJECT = 'Ứng tuyển việc làm phổ thông'

export const APPLY_EMAIL_TEMPLATE = `Tiêu đề: Ứng tuyển Công nhân đóng gói

Xin chào Bình Minh Group,

Tôi tên là [Họ tên], sinh năm [19xx], hiện sống tại [Địa chỉ].
Tôi mong muốn ứng tuyển vị trí Công nhân đóng gói.
Số điện thoại liên hệ: [SĐT]

Trân trọng,
[Họ tên]`

// ─── Form Validation Messages ─────────────────────────────────────────────────

export const FORM_VALIDATION = {
  nameRequired: 'Vui lòng nhập họ tên',
  emailRequired: 'Vui lòng nhập địa chỉ email',
  emailInvalid: 'Địa chỉ email không hợp lệ',
  messageRequired: 'Vui lòng nhập nội dung liên hệ',
  submitError: 'Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.',
  networkError: 'Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.',
  successMessage: 'Yêu cầu của bạn đã được gửi thành công, chúng tôi sẽ liên hệ sớm nhất.',
  submitting: 'Đang gửi...',
  submitButton: 'Gửi yêu cầu',
} as const

// ─── Contact Page UI Text ─────────────────────────────────────────────────────

export const CONTACT_UI = {
  recruitmentInfo: 'Thông tin tuyển dụng',
  contactDescription: 'Liên hệ trực tiếp qua Hotline hoặc Email để được sắp xếp lịch phỏng vấn sớm nhất.',
  emailLabel: 'Email ứng tuyển',
  hotlineLabel: 'Hotline 24/7',
  locationLabel: 'Khu vực làm việc',
  locationValue: 'Hà Nội, Bắc Ninh, Hải Phòng',
  applyNowTitle: 'Nộp hồ sơ ngay?',
  applyNowDescription: 'Gửi thông tin của bạn ngay bây giờ để nhận lịch phỏng vấn sớm nhất.',
  applyEmailButton: 'Gửi email ứng tuyển ngay',
  applicationGuide: 'Hướng dẫn nộp hồ sơ',
  positionTitle: 'Vị trí mong muốn',
  positionDesc: 'Tiêu đề email ghi rõ: Ứng tuyển [Vị trí công việc]',
  basicInfoTitle: 'Thông tin cơ bản',
  basicInfoDesc: 'Gửi ngắn gọn: Họ tên, Năm sinh, Địa chỉ, Số điện thoại liên hệ.',
  documentsTitle: 'Giấy tờ tùy thân',
  documentsDesc: 'Nếu có, đính kèm ảnh chụp CCCD/CMND để chúng tôi ưu tiên xét duyệt.',
  emailTemplateTitle: 'Mẫu nội dung email ứng tuyển',
  copyHint: 'Sao chép và sửa lại thông tin của bạn',
  disclaimer: '* Lưu ý: Chúng tôi không thu bất kỳ khoản phí nào của người lao động. Cẩn thận với các hành vi lừa đảo nộp phí phỏng vấn.',
} as const

// ─── API Error Messages ───────────────────────────────────────────────────────

export const API_ERRORS = {
  validationFailed: 'Validation failed',
  noEventData: 'No event data provided',
  invalidJson: 'Invalid JSON body',
  internalServerError: 'Internal server error',
  contactSuccess: 'Yêu cầu đã được gửi',
} as const

// ─── API Type Definitions ───────────────────────────────────────────────────

export interface UserData {
  em?: string
  ph?: string
  ge?: string
  db?: string
  ln?: string
  fn?: string
  ct?: string
  st?: string
  zp?: string
  country?: string
}

export interface FacebookEvent {
  event_name: string
  event_time?: number
  event_source_url?: string
  user_data?: UserData
  custom_data?: Record<string, any>
  event_id?: string
}

export interface ConversionsPayload {
  data: FacebookEvent[]
  test_event_code?: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  details?: string[]
}
