# Strapi Backend Kurulumu ve Yapılandırması

Bu belge, kişisel blog projenizin backend kısmını (Strapi) kurmak ve gerekli içerik modellerini oluşturmak için adım adım talimatlar içerir.

## 1. Strapi Projesini Oluşturma
Terminalinizde `blog` klasörünün içinde olduğunuzdan emin olun ve aşağıdaki komutu çalıştırın:

```bash
# blog klasöründe olduğunuzu varsayıyoruz
npx create-strapi-app@latest backend --quickstart
```
> **Not:** `--quickstart` parametresini kullandığımız için SQLite veritabanı otomatik olarak kullanılacak ve kurulum biter bitmez tarayıcınızda Strapi Admin paneli açılacaktır (`http://localhost:1337/admin`).

## 2. Admin Kullanıcısı Oluşturma
Strapi sunucusu çalıştıktan sonra tarayıcıda açılan sayfada ilk yönetici kullanıcınızı oluşturun (Ad, Soyad, Email, Şifre).

## 3. İçerik Tiplerini (Content Types) Oluşturma
Sol menüdeki **Content-Type Builder** (İçerik Tipi Oluşturucu) sekmesine tıklayın.
1. **Create new collection type** butonuna tıklayın.
2. **Display name**: `Post` (veya `Article`) yazın ve Continue deyin.
3. Aşağıdaki alanları (Field) ekleyin:
    - **Title** (Text -> Short text): "Blog Başlığı"
    - **Slug** (UID -> Attached field: Title seçilmeli): "blog-basligi" şeklinde URL üretecek.
    - **Content** (Rich Text -> **Standard / Markdown**): Blog içeriği.
      *Önemli: Eğer Strapi v5 kullanıyorsanız, `Rich Text (Markdown)` seçeneğini bulamayabilirsiniz. O durumda `Single Type` değil `Components` değil `Dynamic Zone` da değil, sadece `Rich text` (Markdown) seçmeye çalışın. Eğer sadece "Blocks" varsa onu da seçebilirsiniz ama frontend tarafında işler biraz karışır. En kolayı "Blocks" yerine MARKETPLACE'den `ckeditor` veya `markdown` eklentisi kurmaktır, ancak başlangıç için varsayılanı kullanacağız.*
      *(Eğer "Blocks" zorunlu ise, `Content` alanını "Rich text (Markdown)" olarak eklediğinizden emin olun, yoksa JSON döner.)*
    - **Cover** (Media -> Single media): Kapak resmi.
    - **Description** (Text -> Long text): Özet yazı (listeleme sayfası için).
    - **Publish Date** (Date -> Date): Yayınlanma tarihi (opsiyonel, Strapi'nin kendi `publishedAt` alanı da kullanılabilir).
    - **Tags** (Json veya Text): Basit etiketler için "Text" (Short text) seçip virgülle ayırabilirsiniz (örn: `javascript, backend`).

4. Tüm alanları ekledikten sonra sağ üstteki **Save** butonuna basın ve sunucunun yeniden başlamasını bekleyin.

## 4. İzinleri Ayarlama (API Erişimi)
Postlarınızın frontend tarafından okunabilmesi için izin vermeniz gerekir.
1. Sol menüden **Settings** > **Users & Permissions Plugin** > **Roles** sekmesine gidin.
2. **Public** rolüne tıklayın.
3. **Permissions** bölümünde **Post** (veya `Article`) başlığını bulun ve genişletin.
4. **find** ve **findOne** kutucuklarını işaretleyin.
5. Sağ üstten **Save** butonuna basın.

## 5. Örnek İçerik Girişi
1. Sol menüden **Content Manager** > **Post** sekmesine gidin.
2. **Create new entry** diyerek 2-3 tane örnek blog yazısı girin.
3. Her yazı için "Title", "Slug", "Content" ve bir tane "Cover" resmi yüklemeyi unutmayın.
4. Sağ üstteki **Publish** butonuna basarak yazıları yayınlayın (Draft olarak kalmasın).

Artık backend hazır! Frontend kodlarına geçebilirsiniz.
