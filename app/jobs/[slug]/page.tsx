import { notFound } from 'next/navigation'
import { jobs } from '../../../data/jobs'

export function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug
  }))
}

export default function JobDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const job = jobs.find((item) => item.slug === params.slug)

  if (!job) {
    notFound()
  }

  return (
    <div className="page-content">
      <section className="section detail-hero">
        <p className="eyebrow">Chi tiết công việc</p>
        <h1>{job.title}</h1>
        <p>{job.description}</p>
        <div className="job-overview">
          <div>
            <strong>Ngành nghề</strong>
            <p>{job.category}</p>
          </div>
          <div>
            <strong>Hình thức</strong>
            <p>{job.type}</p>
          </div>
          <div>
            <strong>Địa điểm</strong>
            <p>{job.location}</p>
          </div>
          <div>
            <strong>Lương</strong>
            <p>{job.salary}</p>
          </div>
        </div>
      </section>

      <section className="section detail-section">
        <h2>Mô tả công việc</h2>
        <p>{job.description}</p>

        <div className="detail-grid">
          <div>
            <h3>Nhiệm vụ chính</h3>
            <ul>
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Yêu cầu</h3>
            <ul>
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Quyền lợi</h3>
            <ul>
              {job.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section apply-section">
        <div className="apply-card">
          <h2>Ứng tuyển ngay</h2>
          <p>{job.applyInstructions}</p>
          <p>
            Email ứng tuyển:{' '}
            <a href={`mailto:${job.applyEmail}`}>{job.applyEmail}</a>
          </p>
          <p>
            Lưu ý: tiêu đề email ghi rõ là{' '}
            <strong>Ứng tuyển {job.title}</strong>.
          </p>
          <a
            href={`mailto:${job.applyEmail}?subject=Ứng tuyển ${encodeURIComponent(job.title)}`}
            className="button button-primary"
          >
            Gửi email ứng tuyển
          </a>
        </div>
      </section>
    </div>
  )
}
