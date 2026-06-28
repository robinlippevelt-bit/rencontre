// ==============================
// CONFIGURATION SUPABASE
// ==============================

const SUPABASE_URL = "https://sgsutgftaynboivqdgze.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3V0Z2Z0YXluYm9pdnFkZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzczNzQsImV4cCI6MjA5ODI1MzM3NH0.5zTrui_-8BfZn0UUjP3gafcK0UpnWy2yF8u2O9dOuic";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ==============================
// FORMULAIRE
// ==============================

const form = document.getElementById("form");
const resultat = document.getElementById("resultat");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    resultat.innerHTML = "⏳ Envoi en cours...";

    const sport =
        document.querySelector('input[name="sport"]:checked')?.value || "";

    const jeux =
        document.querySelector('input[name="jeux"]:checked')?.value || "";

    const fume =
        document.querySelector('input[name="fume"]:checked')?.value || "";

    const bois =
        document.querySelector('input[name="bois"]:checked')?.value || "";

    const donnees = {

        nom: document.getElementById("nom").value,

        prenom: document.getElementById("prenom").value,

        age: Number(document.getElementById("age").value) || null,

        taille: Number(document.getElementById("taille").value) || null,

        origines: document.getElementById("origines").value,

        aime_chez_les_mecs:
            document.getElementById("aime_mecs").value,

        serie_preferee:
            document.getElementById("serie").value,

        film_prefere:
            document.getElementById("film").value,

        fait_du_sport: sport,

        aime_soirees_jeux: jeux,

        fume: fume,

        bois: bois,

        qualites:
            document.getElementById("qualites").value,

        defauts:
            document.getElementById("defauts").value,

        commentaire:
            document.getElementById("commentaire").value

    };

    const { error } = await client
        .from("candidates")
        .insert([donnees]);

    if (error) {

        console.error(error);

        resultat.innerHTML = `
        ❌ Une erreur est survenue.<br><br>
        Vérifie que les colonnes existent bien dans Supabase.
        `;

        return;

    }

    resultat.innerHTML = `
        <h2>🎉 Merci !</h2>

        <p>
        Ta candidature a bien été enregistrée ❤️
        </p>

        <br>

        <h3>😂 Petite précision...</h3>

        <p>
        Je m'en fous complètement de la taille et des origines 😆
        </p>

        <p>
        C'était juste pour rigoler et voir si tu allais tout remplir jusqu'au bout 😂
        </p>

        <br>

        <h3>✅ Merci d'avoir joué le jeu ❤️</h3>
    `;

    form.reset();

});