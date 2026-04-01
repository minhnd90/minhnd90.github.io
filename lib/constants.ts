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
