import { isRoomLocked, useScene } from '../../context/SceneContext';
import { GALLERY_PROJECTS } from '../../config/galleryProjects';
import '../../styles/ScreenReaderOverlay.scss';

/**
 * ScreenReaderOverlay — A7 Accessibility
 * 
 * Invisible HTML layer providing screen reader access to 3D canvas content.
 * Contains buttons/links matching interactive 3D elements (doors, rooms).
 * Visually hidden via .sr-only but fully accessible to assistive tech.
 */
const ScreenReaderOverlay = () => {
    const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit } = useScene();
    
    // Pobieranie danych do wygenerowania niewidocznego HTML-a dla SEO / robotów
    return (
        <div className="sr-overlay" role="complementary" aria-label="Accessible navigation for 3D portfolio">
            {/* Skip to content link */}
            <a href="#sr-main-nav" className="sr-only sr-focusable">
                Skip to accessible navigation
            </a>

            {/* Main accessible navigation */}
            <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
                <h1>Sudharshan — Creative Developer Portfolio</h1>
                <h2>Portfolio Navigation</h2>

                {!hasEntered && (
                    <p>Welcome to Sudharshan's interactive 3D portfolio. Click or press Enter on the doors to enter.</p>
                )}

                {hasEntered && !isInRoom && (
                    <>
                        <p>You are in the corridor. Choose a room to explore:</p>
                        <ul>
                            <li>
                                <button onClick={() => teleportTo('about')} type="button">
                                    About — My story, skills, and journey
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('gallery')} type="button">
                                    The Gallery — my projects and work
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('contact')} type="button">
                                    Contact — Get in touch with me
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('studio')} type="button" disabled={isRoomLocked('studio')}>
                                    The Studio — Locked
                                </button>
                            </li>
                        </ul>
                    </>
                )}

                {hasEntered && isInRoom && (
                    <>
                        <p>
                            You are in the {currentRoom === 'about' ? 'About' :
                                currentRoom === 'gallery' ? 'Gallery' :
                                    currentRoom === 'contact' ? 'Contact' :
                                        currentRoom === 'studio' ? 'Studio' : currentRoom} room.
                        </p>
                        <button onClick={requestExit} type="button">
                            Go back to corridor
                        </button>

                        {/* Room-specific content descriptions */}
                        {currentRoom === 'about' && (
                            <div aria-label="About room content">
                                <h3>Gorla Sudharshan</h3>
                                <section aria-labelledby="about-journey">
                                    <h4 id="about-journey">My Journey</h4>
                                    <p>
                                        I'm currently pursuing a B.Tech in Computer Science and Engineering
                                        (Artificial Intelligence &amp; Machine Learning) at Chaitanya Bharathi Institute
                                        of Technology (CBIT), Proddatur, with an expected graduation year of 2027.
                                    </p>
                                    <p>
                                        During my college journey (2023–Present), I've developed a strong interest in
                                        programming, Artificial Intelligence, Data Analytics, and Data Engineering.
                                    </p>
                                    <p>
                                        Through academic learning, self-learning, and hands-on projects, I've explored
                                        Python, SQL, Machine Learning, Generative AI, database management, and data visualization.
                                    </p>
                                    <p>
                                        I've focused on applying my knowledge through practical projects, including
                                        AI-powered applications, data warehouses, machine learning models, and interactive dashboards.
                                    </p>
                                    <p>
                                        My college journey is helping me build the technical foundation and
                                        problem-solving skills needed to grow as an AI and Data professional.
                                    </p>
                                </section>
                                <section aria-labelledby="about-skills">
                                    <h4 id="about-skills">My Skills</h4>
                                    <ul>
                                        <li>Programming: Python, SQL</li>
                                        <li>AI &amp; Machine Learning: Generative AI, Machine Learning, RAG, NLP</li>
                                        <li>Data Analytics: Power BI, Excel, Pandas, NumPy</li>
                                        <li>Data Engineering: ETL, Data Warehousing, MySQL, PySpark</li>
                                        <li>Backend &amp; Automation: FastAPI, Flask, n8n, REST APIs</li>
                                        <li>Tools: Git, GitHub</li>
                                    </ul>
                                </section>
                            </div>
                        )}
                        {currentRoom === 'gallery' && (
                            <div aria-label="Gallery room content">
                                <h3>My Projects</h3>
                                <p>Browse my projects displayed on interactive paper cards. Each card links to its GitHub repository.</p>
                                <ul>
                                    {GALLERY_PROJECTS.map((project) => (
                                        <li key={project.id}>
                                            <h4>{project.title}</h4>
                                            <p>{project.description}</p>
                                            <a href={project.url} target="_blank" rel="noreferrer">
                                                View {project.title} on GitHub
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {currentRoom === 'contact' && (
                            <div aria-label="Contact room content">
                                <h3>Contact Me</h3>
                                <p>Find my social media links displayed as floating barrels. Click to visit my profiles on LinkedIn, GitHub, and other platforms.</p>
                            </div>
                        )}
                        {currentRoom === 'studio' && (
                            <div aria-label="Studio room content">
                                <h3>The Studio is locked</h3>
                                <p>This room is currently unavailable.</p>
                            </div>
                        )}

                        {/* Quick navigation to other rooms */}
                        <h3>Quick Navigation</h3>
                        <ul>
                            {currentRoom !== 'about' && (
                                <li><button onClick={() => teleportTo('about')} type="button">Go to About</button></li>
                            )}
                            {currentRoom !== 'gallery' && (
                                <li><button onClick={() => teleportTo('gallery')} type="button">Go to Gallery</button></li>
                            )}
                            {currentRoom !== 'contact' && (
                                <li><button onClick={() => teleportTo('contact')} type="button">Go to Contact</button></li>
                            )}
                        </ul>
                    </>
                )}
            </nav>

            {/* Live region for state changes */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isInRoom && `Entered ${currentRoom} room`}
            </div>
        </div>
    );
};

export default ScreenReaderOverlay;
