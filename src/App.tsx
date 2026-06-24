import { useEffect, useState } from 'react'
import './App.css'

const profile = {
  initials: 'MJ',
  name: 'Mrugesh',
  role: 'engineering researcher',
  intro:
    'I work across desalination, optimization, and thermodynamic design, building practical models for cleaner and more efficient engineering systems.',
  researchProfile:
    'My research focuses on applied thermal systems, water treatment processes, and optimization-led design. I study how engineering models can improve resource efficiency while staying grounded in real deployment constraints.',
  researchProfileAlt:
    'Current work connects desalination performance, thermodynamic analysis, and process optimization to support robust industrial decision-making.',
  email: 'abcd@gmail.com',
  phone: '+91-98765 43210',
}

const researchAreas = ['Research area', 'Desalination', 'Optimization', 'Thermodynamic Design']

const publications = [
  {
    authors: 'Author Alpha, Author Beta',
    year: 2025,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    journal: 'Journal Name, Page 12-23',
    citations: 57,
  },
  {
    authors: 'Author Alpha, Author Beta',
    year: 2023,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    journal: 'Journal Name, Page 12-23',
    citations: 21,
  },
  {
    authors: 'Author Alpha, Author Beta',
    year: 2024,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    journal: 'Journal Name, Page 12-23',
    citations: 84,
  },
]

const education = [
  {
    degree: 'Degree name',
    year: 'Year',
    institute: 'Institute Name',
    score: 'CPI',
    details:
      'Research Details Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    degree: 'Degree name',
    year: 'Year',
    institute: 'Institute Name',
    score: 'CPI',
    details:
      'Research Details Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
]

function App() {
  const [isNavCondensed, setIsNavCondensed] = useState(false)
  const [publicationSort, setPublicationSort] = useState<'year' | 'citations'>('year')

  const sortedPublications = [...publications].sort((left, right) => {
    if (publicationSort === 'citations') {
      return right.citations - left.citations
    }

    return right.year - left.year
  })

  useEffect(() => {
    const updateNav = () => setIsNavCondensed(window.scrollY > 24)

    updateNav()
    window.addEventListener('scroll', updateNav, { passive: true })

    return () => window.removeEventListener('scroll', updateNav)
  }, [])

  return (
    <div className="page-shell">
      <header className={`site-header${isNavCondensed ? ' site-header--condensed' : ''}`}>
        <a className="brand" href="#home" aria-label="Back to top">
          {profile.initials}
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#publications">Publications</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="home">
        <section id="about" className="intro-section">
          <h1>
            I&apos;m {profile.name}. I work as an {profile.role}
          </h1>
          <p className="intro-copy">{profile.intro}</p>
          <ul className="research-tags" aria-label="Research interests">
            {researchAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>

        <section className="profile-section" aria-labelledby="profile-heading">
          <div className="profile-copy">
            <h2 id="profile-heading">Research Profile</h2>
            <p>{profile.researchProfile}</p>
            <p>{profile.researchProfileAlt}</p>
          </div>
          <div className="portrait-placeholder" aria-label="Profile image placeholder" />
        </section>

        <section id="publications" className="content-section" aria-labelledby="publications-heading">
          <div className="section-kicker">
            <h2 id="publications-heading">Publications</h2>
            <label className="sort-control" htmlFor="publication-sort">
              <span>Sort by</span>
              <select
                id="publication-sort"
                value={publicationSort}
                onChange={(event) => setPublicationSort(event.target.value as 'year' | 'citations')}
              >
                <option value="year">Year</option>
                <option value="citations">Citations</option>
              </select>
            </label>
          </div>

          <div className="publication-list">
            {sortedPublications.map((publication, index) => (
              <article className="publication-item" key={`${publication.title}-${index}`}>
                <div className="publication-meta">
                  <span>{publication.authors}</span>
                  <span>{publication.year}</span>
                </div>
                <h3>{publication.title}</h3>
                <div className="publication-footer">
                  <span>{publication.journal}</span>
                  <span>{publication.citations} citations</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="content-section education-section" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>

          <div className="education-list">
            {education.map((item, index) => (
              <article className="education-item" key={`${item.institute}-${index}`}>
                <div className="education-meta">
                  <span>{item.degree}</span>
                  <span>{item.year}</span>
                </div>
                <h3>{item.institute}</h3>
                <div className="education-details">
                  <p>{item.details}</p>
                  <span>{item.score}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>

          <div className="contact-grid">
            <div className="contact-details">
              <div>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div>
                <span>Phone</span>
                <a href={`tel:${profile.phone.replace(/[\s-]/g, '')}`}>{profile.phone}</a>
              </div>
            </div>

            <form className="inquiry-form" onSubmit={(event) => event.preventDefault()}>
              <h3>Submit an Inquiry</h3>
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input name="name" type="text" />
                </label>
                <label>
                  <span>Organization</span>
                  <input name="organization" type="text" />
                </label>
              </div>
              <label>
                <span className="visually-hidden">Message</span>
                <textarea name="message" rows={5} />
              </label>
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
