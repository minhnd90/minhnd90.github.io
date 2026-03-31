import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Liên hệ | BM Group',
  description: 'Liên hệ BM Group để nhận việc làm phù hợp trong vòng 24h.',
}

export default function ContactPage() {
  const contactEmail = process.env.CONTACT_EMAIL || 'tuyendung@bm-group.info.vn'
  const contactPhone = process.env.CONTACT_PHONE || '0988 108 250'
  const applySubject = encodeURIComponent('Ứng tuyển việc làm phổ thông')

  return (
    <div className="nextra-content" style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Liên hệ và ứng tuyển nhanh</h1>

      <p>Bạn có thể liên hệ trực tiếp để nhận được việc làm phù hợp trong vòng 24h.</p>

      <h2>Thông tin tuyển dụng</h2>

      <ul>
        <li><strong>Email ứng tuyển:</strong> {contactEmail}</li>
        <li><strong>Hotline:</strong> {contactPhone}</li>
        <li><strong>Địa điểm chính:</strong> Hà Nội, Bắc Ninh, Hải Phòng</li>
      </ul>

      <h2>Hướng dẫn nộp hồ sơ</h2>

      <ol>
        <li>Ghi rõ vị trí muốn ứng tuyển trong tiêu đề email.</li>
        <li>Gửi thông tin cá nhân ngắn gọn: họ tên, tuổi, địa chỉ, số điện thoại.</li>
        <li>Nếu có, đính kèm ảnh chụp CMND/CCCD hoặc giấy tờ tùy thân.</li>
      </ol>

      <h2>Mẫu nội dung email</h2>

      <pre style={{ background: 'var(--nextra-bg, #f6f6f6)', padding: '1rem', borderRadius: 8, overflowX: 'auto' }}>
        <code>{`Tiêu đề: Ứng tuyển Công nhân đóng gói

Xin chào,

Tôi tên là [Họ tên], sinh năm [19xx], hiện sống tại [Địa chỉ].
Tôi mong muốn ứng tuyển vị trí Công nhân đóng gói.
Số điện thoại: [SĐT]

Trân trọng,
[Họ tên]`}</code>
      </pre>

      <h2>Nộp hồ sơ nhanh</h2>

      <p>
        <a href={`mailto:${contactEmail}?subject=${applySubject}`}>
          Gửi email ứng tuyển ngay
        </a>
      </p>

      <p>Nếu cần trợ giúp, gọi ngay hotline để được hỗ trợ sắp lịch phỏng vấn hoặc hướng dẫn thủ tục.</p>
    </div>
  )
}
