export interface Job {
  slug: string
  title: string
  category: string
  type: string
  location: string
  schedule: string
  level: string
  salary: string
  postedAt: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  applyEmail: string
  applyInstructions: string
  tags: string[]
}

export const jobs: Job[] = [
  {
    slug: 'cong-nhan-dong-goi',
    title: 'Công nhân đóng gói',
    category: 'Sản xuất',
    type: 'Toàn thời gian',
    location: 'Hà Nội',
    schedule: '8h-17h',
    level: 'Không yêu cầu kinh nghiệm',
    salary: '7.000.000 - 9.000.000 VNĐ/tháng',
    postedAt: 'Cập nhật hôm nay',
    description:
      'Tuyển công nhân đóng gói cho xưởng sản xuất: đóng gói, phân loại, kiểm soát chất lượng đơn giản.',
    responsibilities: [
      'Đóng gói sản phẩm theo yêu cầu',
      'Kiểm tra sản phẩm, ghi nhãn và đóng thùng',
      'Giữ khu vực làm việc sạch sẽ, tuân thủ an toàn lao động',
      'Hỗ trợ quản lý kho khi cần thiết'
    ],
    requirements: [
      'Tuổi 18-40',
      'Chịu được ca sáng hoặc ca chiều',
      'Nhiệt tình, siêng năng, chịu khó',
      'Không yêu cầu kinh nghiệm, có đào tạo tại chỗ'
    ],
    benefits: [
      'Lương thử việc 6.500.000 VNĐ/tháng',
      'Chấm công rõ ràng, nhận lương theo tháng',
      'Hỗ trợ ăn ca và đi lại',
      'Đóng BHXH sau thử việc'
    ],
    applyEmail: 'tuyendung@bmg.vn',
    applyInstructions:
      'Gửi CV hoặc thông tin cơ bản kèm tiêu đề: Ứng tuyển Công nhân đóng gói.',
    tags: ['Lao động phổ thông', 'Không yêu cầu kinh nghiệm', 'Sản xuất']
  },
  {
    slug: 'nhan-vien-kho',
    title: 'Nhân viên kho',
    category: 'Kho vận',
    type: 'Toàn thời gian',
    location: 'Bắc Ninh',
    schedule: '7h-16h',
    level: 'Lao động phổ thông',
    salary: '8.000.000 - 10.000.000 VNĐ/tháng',
    postedAt: 'Cập nhật 2 ngày trước',
    description:
      'Tuyển nhân viên kho hàng, sắp xếp, kiểm kê, đóng gói đơn hàng cho kho logistics.',
    responsibilities: [
      'Nhận và kiểm tra hàng vào kho',
      'Sắp xếp, phân loại và dán nhãn hàng hóa',
      'Chuẩn bị đơn hàng xuất kho',
      'Giữ gìn kho sạch sẽ, thực hiện kiểm kê định kỳ'
    ],
    requirements: [
      'Tuổi 18-45',
      'Sức khỏe tốt, chịu được làm việc trong kho',
      'Ưu tiên ứng viên chịu ca kíp',
      'Không yêu cầu bằng cấp'
    ],
    benefits: [
      'Lương vào ngày 25 hàng tháng',
      'Phụ cấp cơm trưa và xăng xe',
      'Hỗ trợ chỗ ở nếu cần',
      'Thưởng chuyên cần và làm thêm'
    ],
    applyEmail: 'tuyendung@bmg.vn',
    applyInstructions:
      'Gửi thông tin ứng tuyển Nhân viên kho kèm số điện thoại liên hệ.',
    tags: ['Kho vận', 'Ca kíp', 'Phổ thông']
  },
  {
    slug: 'nhan-vien-lap-rap',
    title: 'Nhân viên lắp ráp linh kiện',
    category: 'Công nghiệp',
    type: 'Ca kíp',
    location: 'Hải Phòng',
    schedule: '22h-7h',
    level: 'Lao động phổ thông',
    salary: '10.000.000 - 12.000.000 VNĐ/tháng',
    postedAt: 'Cập nhật 5 ngày trước',
    description:
      'Tuyển nhân viên lắp ráp linh kiện điện tử cho ca đêm, công việc nhẹ nhàng, ổn định.',
    responsibilities: [
      'Lắp ráp các bộ phận theo quy trình',
      'Kiểm tra chất lượng sản phẩm sau lắp ráp',
      'Bảo quản dụng cụ và khu vực làm việc',
      'Báo cáo ngay khi có lỗi hoặc thiếu vật tư'
    ],
    requirements: [
      'Tuổi 18-35',
      'Chăm chỉ, tỉ mỉ, kỷ luật',
      'Ưu tiên người biết dùng máy cơ bản',
      'Sẵn sàng làm ca đêm'
    ],
    benefits: [
      'Lương thưởng ca đêm hấp dẫn',
      'Xét tăng lương theo tháng',
      'Bảo hiểm lao động sau thử việc',
      'Hỗ trợ ăn ca và đi lại'
    ],
    applyEmail: 'tuyendung@bmg.vn',
    applyInstructions:
      'Nộp hồ sơ qua email với tiêu đề Ứng tuyển Nhân viên lắp ráp linh kiện.',
    tags: ['Lắp ráp', 'Ca đêm', 'Công nghiệp']
  }
]
