// ============================================
// RUMAH KHITAN MUSTOPA - Configuration File
// ============================================

const CONFIG = {
    // Pengaturan Umum Website
    logoUrl: 'assets/images/logo.png',
    brandName: 'Rumah Khitan Mustopa',
    shortBrandName: 'Kak Topa',
    operatingHours: 'Setiap Hari, 08:00 - 20:00 WIB',
    instagramUrl: 'https://www.instagram.com/rumahkhitanKak Topa/',
    facebookUrl: 'https://www.facebook.com/rumahkhitanKak Topa',

    // Pengaturan Khusus Cabang (Bandung & Garut)
    branches: {
        bandung: {
            name: 'Cabang Bandung',
            'clinic-location': 'Klinik Khitan Modern di Bandung Barat',
            address: 'Bandung Barat, Jawa Barat',
            'phone-display': '0851-9604-9990',
            whatsappNumber: '6285196049990', // Format WhatsApp internasional
            photoUrl: 'assets/images/clinic-bandung.jpp',
            googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0377!2d107.5184!3d-6.8397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e33e8f152829%3A0x51c0fcb8c61b4975!2sRumah+Khitan+Kak Topa!5e0!3m2!1sid!2sid!4v1',
            googleMapsUrl: 'https://maps.google.com/?cid=5890986183128467829'
        },
        garut: {
            name: 'Cabang Garut',
            'clinic-location': 'Klinik Khitan Modern di Garut',
            address: 'Garut, Jawa Barat',
            'phone-display': '0812-2022-4867', // Format rapi untuk tampilan
            whatsappNumber: '6281220224867', // Diubah ke format WhatsApp 62...
            photoUrl: 'assets/images/clinic-garut.jpg',
            googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Rumah%20Khitan%20Mustopa%20Garut&t=&z=15&ie=UTF8&iwloc=&output=embed',
            googleMapsUrl: 'https://www.google.com/maps/search/Rumah+Khitan+Mustopa+Garut'
        }
    }
};
