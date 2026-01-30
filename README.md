# Kişisel Blog Projesi (Strapi + Vanilla JS)

Bu proje, bir Backend geliştiricisinin tecrübelerini paylaşması amacıyla tasarlanmış, sade ve modern bir blog altyapısıdır.

## Proje Yapısı

- **`/backend`**: Strapi CMS dosyaları (Henüz oluşturulmadı, `strapi_setup_guide.md` dosyasındaki talimatları izleyin).
- **`/frontend`**: Statik HTML, CSS ve JavaScript kodları.
    - `index.html`: Blog listeleme sayfası.
    - `post.html`: Blog detay sayfası.
    - `css/style.css`: Stil dosyaları.
    - `js/app.js`: API entegrasyonu.

## Kurulum ve Başlangıç

1. **Backend Kurulumu**: Öncelikle `/strapi_setup_guide.md` dosyasını okuyarak Strapi projesini oluşturun ve içerik modellerini ayarlayın.
2. **İçerik Girişi**: Admin panelinden (`http://localhost:1337/admin`) birkaç blog yazısı ekleyin.
3. **Frontend Başlatma**:
   - VS Code Live Server eklentisi ile `frontend/index.html` dosyasını çalıştırın.
   - Veya terminalden basit bir sunucu başlatın:
     ```bash
     cd frontend
     npx serve .
     ```
   - Tarayıcınızda yazıları görmelisiniz! (Strapi'nin çalıştığından emin olun).

## Deployment

Projeyi canlıya almak için `/DEPLOYMENT.md` dosyasındaki adımları takip edebilirsiniz.

## Teknolojiler

- **Backend**: Strapi v5 (Headless CMS)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Markdown Render**: `marked.js`
- **Sanitizer**: `dompurify`

İyi Codingler! 🚀
