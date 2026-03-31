'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { jobs, type Job } from '../../data/jobs'

const filters = {
  category: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.category)))],
  type: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.type)))],
  location: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.location)))]
}

export default function JobsPage() {
  const [category, setCategory] = useState('Tất cả')
  const [type, setType] = useState('Tất cả')
  const [location, setLocation] = useState('Tất cả')
  const [keyword, setKeyword] = useState('')

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchCategory = category === 'Tất cả' || job.category === category
      const matchType = type === 'Tất cả' || job.type === type
      const matchLocation = location === 'Tất cả' || job.location === location
      const text =
        `${job.title} ${job.description} ${job.tags.join(' ')}`.toLowerCase()
      const matchKeyword =
        keyword.trim() === '' || text.includes(keyword.toLowerCase())
      return matchCategory && matchType && matchLocation && matchKeyword
    })
  }, [category, type, location, keyword])

  return (
    <div className="page-content">
      <section className="section hero-section">
        <p className="eyebrow">Việc làm phổ thông nhanh</p>
        <h1>Job board tuyển dụng lao động phổ thông</h1>
        <p>
          Dễ tìm việc, lương rõ, support hồ sơ nhanh. Chọn lọc công việc Phổ
          Thông chất lượng từ các doanh nghiệp có nhu cầu thực.
        </p>
      </section>

      <section className="section filter-section">
        <div className="filter-row">
          <label>
            Ngành nghề
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {filters.category.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label>
            Hình thức
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              {filters.type.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label>
            Địa điểm
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {filters.location.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="search-row">
          <input
            type="search"
            placeholder="Tìm kiếm theo vị trí, công việc, tags..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </section>

      <section className="section jobs-list">
        <div className="list-header">
          <h2>{filteredJobs.length} công việc phù hợp</h2>
          <p>
            Chọn công việc phù hợp, nhấn vào từng tin để xem chi tiết và nộp hồ
            sơ.
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <p>Không tìm thấy công việc phù hợp với điều kiện của bạn.</p>
          </div>
        ) : (
          <div className="job-grid">
            {filteredJobs.map((job: Job) => (
              <article className="job-card" key={job.slug}>
                <div className="job-card-header">
                  <span className="job-badge">{job.type}</span>
                  <span className="job-location">{job.location}</span>
                </div>
                <h3>{job.title}</h3>
                <p className="job-meta">
                  {job.category} · {job.level}
                </p>
                <p className="job-salary">{job.salary}</p>
                <p className="job-description">{job.description}</p>
                <div className="job-card-footer">
                  <Link
                    href={`/jobs/${job.slug}`}
                    className="button button-primary"
                  >
                    Xem chi tiết
                  </Link>
                  <span className="posted-at">{job.postedAt}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
