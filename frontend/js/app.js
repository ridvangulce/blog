const STRAPI_URL = 'http://localhost:1337'; // Backend adresi
const API_URL = `${STRAPI_URL}/api`;

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (slug) {
        // Detay sayfası
        loadPostHandler(slug);
    } else {
        // Liste sayfası kontrolü
        const blogList = document.getElementById('blog-list');
        if (blogList) {
            loadPostsHandler();
        } else {
            // Detay sayfasındayız ama slug yok mu?
            const postDetail = document.getElementById('post-detail');
            if (postDetail) {
                postDetail.innerHTML = '<div class="error-container"><h3>Yazı Bulunamadı</h3><p>URL parametresi eksik. Lütfen anasayfadan tekrar deneyin.</p><a href="/" class="btn-back">Anasayfa</a></div>';
            }
        }
    }
});

// Resim URL'sini düzelten yardımcı fonksiyon
function getImageUrl(imageData) {
    if (!imageData) return 'https://placehold.co/800x400';
    // Strapi v5: imageData direk obje olabilir, v4: imageData.attributes
    const url = imageData.url || (imageData.attributes && imageData.attributes.url);
    if (!url) return 'https://placehold.co/800x400';

    // Eğer URL http ile başlıyorsa (Cloudinary vb.) olduğu gibi döndür
    if (url.startsWith('http')) return url;

    // Başlamıyorsa localhost ekle
    return `${STRAPI_URL}${url}`;
}

// Tüm yazıları çekip listeleme
async function loadPostsHandler() {
    const listContainer = document.getElementById('blog-list');

    try {
        // Strapi v5 standart: populate=* tüm ilişkileri (resim vs) getirir
        const response = await fetch(`${API_URL}/posts?populate=*&sort=publishedAt:desc`);

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Erişim Reddedildi (403). Lütfen Strapi Admin panelinden Public rolüne Post yetkisi verin.');
            }
            throw new Error(`API Hatası: ${response.status}`);
        }

        const data = await response.json();

        // Strapi v4/v5 uyumluluğu için veri kontrolü
        const posts = data.data;

        if (!posts || posts.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <p>Henüz hiç yazı eklenmemiş veya yayınlanmamış.</p>
                    <small>Strapi Admin panelinden yazı ekleyip 'Publish' etmeyi unutmayın.</small>
                </div>`;
            return;
        }

        listContainer.innerHTML = posts.map(post => {
            // v5'te veriler direkt objede, v4'te attributes içinde
            const attr = post.attributes || post;
            const imageUrl = getImageUrl(attr.cover);

            // Tarih formatlama
            const date = new Date(attr.publishedAt || attr.createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // Özet metni (description varsa onu kullan, yoksa content'in başını al)
            const summary = attr.description || (attr.content ? attr.content.substring(0, 150) + '...' : '');

            return `
                <article class="post-card">
                    <a href="post?slug=${attr.slug}" class="post-image-link">
                        <img src="${imageUrl}" alt="${attr.title}" class="post-cover-image">
                    </a>
                    <div class="post-content-wrapper">
                        <div class="post-meta">
                            <span class="date">${date}</span>
                        </div>
                        <h2 class="post-title">
                            <a href="post?slug=${attr.slug}">${attr.title}</a>
                        </h2>
                        <p class="post-desc">${summary}</p>
                        <a href="post?slug=${attr.slug}" class="read-more">Devamını Oku <span class="arrow">→</span></a>
                    </div>
                </article>
            `;
        }).join('');

    } catch (error) {
        console.error('Hata:', error);
        listContainer.innerHTML = `
            <div class="error-container">
                <h3>Bir hata oluştu :(</h3>
                <p>${error.message}</p>
                <p>Lütfen backend sunucusunun çalıştığından (npm run develop) emin olun.</p>
            </div>`;
    }
}

// Tekil yazı detayını çekme
async function loadPostHandler(slug) {
    const container = document.getElementById('post-detail');

    try {
        // Slug'a göre filtreleme
        const response = await fetch(`${API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`);

        if (!response.ok) {
            throw new Error(`API Hatası: ${response.status}`);
        }

        const data = await response.json();
        const posts = data.data;

        if (!posts || posts.length === 0) {
            container.innerHTML = `
                <div class="error-container">
                    <h1>Yazı Bulunamadı</h1>
                    <p>Aradığınız içerik mevcut değil veya silinmiş.</p>
                    <a href="index.html" class="btn-back">Listeye Dön</a>
                </div>`;
            return;
        }

        const post = posts[0];
        const attr = post.attributes || post;
        const imageUrl = getImageUrl(attr.cover);

        // Markdown'ı HTML'e çevir (marked kütüphanesi ile)
        const rawHtml = marked.parse(attr.content);
        const cleanHtml = DOMPurify.sanitize(rawHtml);

        const date = new Date(attr.publishedAt || attr.createdAt).toLocaleDateString('tr-TR', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        // Sayfa başlığını güncelle
        document.title = `${attr.title} | Rıdvan Gülçe`;

        container.innerHTML = `
            <header class="post-header">
                <div class="post-meta-detail">
                    <span class="date">🗓 ${date}</span>
                    <!-- Tagler varsa eklenebilir -->
                </div>
                <h1 class="post-title-detail">${attr.title}</h1>
            </header>
            
            <img src="${imageUrl}" alt="${attr.title}" class="post-cover-detail">
            
            <div class="content-body">
                ${cleanHtml}
            </div>
        `;

    } catch (error) {
        console.error('Hata:', error);
        container.innerHTML = `<p class="error">Yazı yüklenirken bir hata oluştu: ${error.message}</p>`;
    }
}
