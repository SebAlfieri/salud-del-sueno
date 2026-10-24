
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("sleepQuiz");
  const results = document.getElementById("quizResults");
  const container = document.getElementById("recommendations");
  const restart = document.getElementById("restartQuiz");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const answers = new FormData(form);
    const get = (name) => answers.get(name);

    const medicalReasons = [];
    const dentalReasons = [];
    const generalTips = [];

    // MEDICAL REFERRAL INDICATORS
    // These are symptom-based educational recommendations,
    // not a validated clinical screening score.

    if (get("pausas") === "si") {
      medicalReasons.push("pausas respiratorias observadas durante el sueño");
    }

    if (get("jadeos") === "si") {
      medicalReasons.push("despertares con sensación de ahogo o falta de aire");
    }

    if (
      get("ronquidosFuertes") === "si" &&
      get("somnolencia") === "frecuente"
    ) {
      medicalReasons.push(
        "ronquidos fuertes acompañados de somnolencia frecuente"
      );
    }

    if (
      get("impacto") === "si" ||
      (get("impacto") === "aveces" && get("calidad") === "muymala")
    ) {
      medicalReasons.push(
        "problemas de sueño que afectan las actividades diarias"
      );
    }

    if (get("somnolencia") === "frecuente") {
      medicalReasons.push(
        "somnolencia frecuente durante el día"
      );
    }

    // DENTAL REFERRAL INDICATORS

    if (get("rechinar") === "si") {
      dentalReasons.push(
        "posible rechinamiento de dientes durante el sueño"
      );
    }

    if (
      get("mandibula") === "si" ||
      get("mandibula") === "aveces"
    ) {
      dentalReasons.push(
        "dolor o cansancio en la mandíbula al despertar"
      );
    }

    if (get("desgaste") === "si") {
      dentalReasons.push(
        "desgaste dental previamente identificado"
      );
    }

    if (
      get("apretar") === "si" &&
      get("mandibula") !== "no"
    ) {
      dentalReasons.push(
        "apretamiento dental acompañado de molestias"
      );
    }

    // ADDITIONAL EDUCATIONAL INFORMATION

    if (
      get("duracion") === "menos6" ||
      get("duracion") === "6a7"
    ) {
      generalTips.push({
        title: "Duración del sueño",
        text: "La mayoría de los adultos necesitan al menos 7 horas de sueño regularmente. Considera reservar suficiente tiempo para descansar.",
        link: "habitos-sueno.html"
      });
    }

    if (
      get("latencia") === "mas60" ||
      get("despertares") === "frecuente"
    ) {
      generalTips.push({
        title: "Dificultades para conciliar o mantener el sueño",
        text: "Si estas dificultades persisten, considera hablar con un profesional de salud. También puedes aprender sobre hábitos que favorecen el descanso.",
        link: "habitos-sueno.html"
      });
    }

    if (get("medicamentos") === "frecuente") {
      generalTips.push({
        title: "Uso de productos para dormir",
        text: "Habla con un profesional de salud sobre el uso frecuente de medicamentos o productos para dormir. No suspendas tratamientos recetados sin orientación médica."
      });
    }

    if (
      get("presion") === "si" ||
      get("corazon") === "si"
    ) {
      generalTips.push({
        title: "Sueño y salud cardiovascular",
        text: "El sueño y la salud cardiovascular están relacionados. Comenta tus hábitos de sueño con tu equipo médico, especialmente si tienes dificultades para descansar."
      });
    }

    if (
      get("ansiedad") === "frecuente" ||
      get("animo") === "frecuente"
    ) {
      generalTips.push({
        title: "Sueño y bienestar emocional",
        text: "La salud emocional y el sueño pueden influirse mutuamente. Si estos síntomas son frecuentes, considera hablar con un profesional de salud."
      });
    }

    if (
      get("ronquidos") === "si" &&
      medicalReasons.length === 0
    ) {
      generalTips.push({
        title: "Ronquidos",
        text: "Los ronquidos no siempre indican apnea del sueño, pero conviene comentarlos con un profesional si son frecuentes, intensos o se acompañan de otros síntomas.",
        link: "sueno-salud-bucal.html"
      });
    }

    // CREATE RESULTS

    container.replaceChildren();

    function createCard(title, description, link) {
      const card = document.createElement("div");
      card.className = "recommendation-card";

      const heading = document.createElement("h3");
      heading.textContent = title;

      const paragraph = document.createElement("p");
      paragraph.textContent = description;

      card.append(heading, paragraph);

      if (link) {
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.textContent = "Aprender más →";
        card.appendChild(anchor);
      }

      container.appendChild(card);
    }

    // MEDICAL RECOMMENDATION — NO LINK

    if (medicalReasons.length > 0) {
      createCard(
        "Recomendamos hablar con un médico",
        "Tus respuestas mencionan " +
        medicalReasons.join(", ") +
        ". Estos síntomas pueden justificar una evaluación de tu salud del sueño. Un médico puede determinar si necesitas estudios adicionales."
      );
    }

    // DENTAL RECOMMENDATION — LINKS TO MODULE 03

    if (dentalReasons.length > 0) {
      createCard(
        "Recomendamos hablar con tu dentista",
        "Tus respuestas mencionan " +
        dentalReasons.join(", ") +
        ". Una evaluación dental puede ayudar a identificar signos de bruxismo u otras causas de molestias en la mandíbula.",
        "sueno-salud-bucal.html"
      );
    }

    // GENERAL SLEEP EDUCATION

    generalTips.forEach((tip) => {
      createCard(tip.title, tip.text, tip.link);
    });

    if (
      medicalReasons.length === 0 &&
      dentalReasons.length === 0 &&
      generalTips.length === 0
    ) {
      createCard(
        "Continúa cuidando tu descanso",
        "Tus respuestas no señalaron dificultades destacadas en las áreas evaluadas. Puedes seguir aprendiendo sobre cómo cuidar tu sueño.",
        "modulos.html"
      );
    }

    form.hidden = true;
    results.hidden = false;
    results.focus();

    results.scrollIntoView({
      behavior: "smooth"
    });
  });

  // RESTART QUESTIONNAIRE

  restart.addEventListener("click", () => {
    form.reset();
    container.replaceChildren();

    results.hidden = true;
    form.hidden = false;

    form.scrollIntoView({
      behavior: "smooth"
    });
  });

});
