-- Run this once via cPanel phpMyAdmin (or `mysql < schema.sql` locally) against
-- the database configured in config.php / getenv('BLOG_DB_*').

CREATE TABLE IF NOT EXISTS blog_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor','author') NOT NULL DEFAULT 'author',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt VARCHAR(500),
  content LONGTEXT NOT NULL,
  featured_image VARCHAR(500),
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  author_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  published_at DATETIME NULL,
  FOREIGN KEY (author_id) REFERENCES blog_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blog_login_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL,
  attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_blog_login_attempts_email ON blog_login_attempts (email, attempted_at);

-- Lets admins override images on public pages (e.g. Services cards) without a
-- code change. content_key is a stable slug like "service-home-based-detox".
CREATE TABLE IF NOT EXISTS site_images (
  content_key VARCHAR(100) PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Extra photos (with captions) shown on a service's "Learn More" detail page,
-- managed entirely from the admin panel - not tied to a code deploy.
CREATE TABLE IF NOT EXISTS service_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_key VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(300),
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_service_gallery_key ON service_gallery (service_key, sort_order);

-- Careers page applications, replacing the old Appwrite-backed storage (which
-- kept auto-pausing on Appwrite's free tier). Files land in uploads/careers/.
CREATE TABLE IF NOT EXISTS career_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  cv_path VARCHAR(500) NOT NULL,
  cover_letter_path VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS career_submit_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip_address VARCHAR(64) NOT NULL,
  attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_career_submit_attempts_ip ON career_submit_attempts (ip_address, attempted_at);
