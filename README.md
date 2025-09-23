# Aplikacija za upravljanje finansijama i budžetom  

Ovaj projekat je razvijen u okviru predmeta **Internet tehnologije** na Fakultetu organizacionih nauka.  
Aplikacija omogućava korisnicima da planiraju i prate svoje budžete, prihode i rashode, kao i da generišu analitičke izveštaje, konvertuju valute, prate cene kriptovaluta i čuvaju račune u elektronskom obliku.  

---

## Tehnologije  

- **Backend**: Laravel (PHP framework)  
- **Frontend**: React (JavaScript biblioteka)  
- **Baza podataka**: MySQL  
- **Dodatne integracije**: CoinGecko API (kripto cene), open.er API (valutni kursevi)  

---

## ✅ Funkcionalnosti  

- 👤 Registracija, prijava i autentifikacija korisnika  
- 💰 Kreiranje, izmena i brisanje budžeta  
- ➕ Dodavanje prihoda i rashoda po budžetu  
- 🔍 Filtriranje i pretraga rashoda  
- 📈 Izveštaji i grafikoni prihoda/rashoda  
- 💱 Konverzija valuta i pregled kripto cena  
- 📎 Upload i brisanje računa (slika/PDF) vezanih za rashode  
- 📤 Eksport podataka u CSV i PDF formatu  

---

## 📂 Struktura projekta  

- **iteh-app/** – Laravel backend (API, migracije, modeli, kontroleri)  
- **frontend/** – React frontend (SPA, komponente, rutiranje, komunikacija sa API-jem)  

---

## Pokretanje na lokalnoj mašini  

### Backend (Laravel)  
```bash
cd iteh-app

# Instaliraj zavisnosti
composer install

# Napravi .env fajl i podesi podatke za bazu (MySQL)

# Generiši aplikacioni ključ
php artisan key:generate

# Pokreni migracije i seedere
php artisan migrate --seed

# Pokreni server
php artisan serve

Backend će biti dostupan na: http://localhost:8000/api
```

### Frontend (React)
```bash
cd frontend

# Instaliraj zavisnosti
npm install

# Pokreni React aplikaciju
npm start

Frontend će biti dostupan na: http://localhost:3000
```

