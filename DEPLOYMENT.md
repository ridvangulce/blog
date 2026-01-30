# Deployment Rehberi

Bu blog projesini canlıya almak için Frontend ve Backend ayrı ayrı deploy edilmelidir.

## 1. Backend (Strapi) Deployment
Strapi dinamik bir Node.js uygulamasıdır ve veri tabanına ihtiyaç duyar.
Vercel, Next.js gibi frameworkler için optimize edilmiştir ancak Strapi gibi kalıcı sunucu (persistent server) gerektiren uygulamalar için en iyi seçenek değildir (Serverless function limitleri ve dosya sistemi sorunu nedeniyle).

**Önerilen Platform:** [Render.com](https://render.com) veya [Railway.app](https://railway.app) (Ücretsiz planları mevcuttur).

### Adım Adım Render Deployment (Özet):
1. Projenizi GitHub'a yükleyin.
2. Render'da yeni bir **Web Service** oluşturun.
3. GitHub reponuzu bağlayın ve `backend` klasörünü root directory olarak seçin.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm run start`
6. **Önemli:** Render free tier'da disk geçicidir (ephemeral). Yani yüklediğiniz resimler ve SQLite veritabanı sunucu kapanınca silinir.
   - **Çözüm 1 (Database):** Render üzerinde bir PostgreSQL veritabanı açıp Strapi'ye bağlayın (Environment Variable ile).
   - **Çözüm 2 (Medya):** Strapi Cloudinary plugin kurarak resimleri Cloudinary'de tutun.

## 2. Frontend Deployment (Vercel)
Frontend tarafı tamamen statik HTML/JS olduğu için Vercel üzerinde barındırmak çok kolaydır.

### Adım Adım:
1. `frontend/js/app.js` dosyasını açın.
2. `const STRAPI_URL = 'http://localhost:1337';` satırını, canlıdaki Strapi adresinizle değiştirin (örn: `https://my-strapi-app.onrender.com`).
3. Terminalde `frontend` klasörüne gidin.
4. Vercel CLI yüklü ise `vercel deploy` komutunu çalıştırın.
   - Veya GitHub reponuzu Vercel'e bağlayıp, "Root Directory" olarak `frontend` klasörünü seçin.
5. Deploy tamamlandığında size verilen URL üzerinden blogunuza erişebilirsiniz.

### Dikkat Edilmesi Gerekenler
- **CORS Hatası:** Strapi admin panelinde (Settings > API Tokens > CORS) veya `config/middlewares.js` dosyasında frontend domaininize izin vermeniz gerekebilir. Genellikle `public` erişim açıksa sorun olmaz ama "Forbidden" hatası alırsanız CORS ayarlarına bakın.
- **Mix Content:** Eğer Frontend https (Vercel default) ise, Backend de https olmalıdır (Render default https verir). Http bir backend'e https üzerinden istek atamazsınız.

## 3. SEO ve Performans İpuçları
- Her blog yazısı için `meta description` ekleyin.
- Görsellerinizi optimize ederek yükleyin (TinyPNG vb.).
- `Lighthouse` testleri yaparak skorunuzu ölçün.
