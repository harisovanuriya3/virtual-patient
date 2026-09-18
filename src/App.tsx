import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [history, setHistory] = useState<
    { id: number; name: string; age: string; diagnosis: string }[]
  >([]);

  const handleSubmit = () => {
    const s = symptoms.toLowerCase();
    let diag = "Недостаточно данных для предварительного диагноза";

    // --- Витальные показатели ---

    // Давление
    if (s.includes("давление_сист")) {
      const syst = parseInt(s.split("давление_сист")[1]);
      if (!isNaN(syst)) {
        if (syst < 90) diag = "Гипотония (низкое систолическое давление)";
        else if (syst > 140) diag = "Гипертония (повышенное систолическое давление)";
      }
    }

    if (s.includes("давление_диаст")) {
      const diast = parseInt(s.split("давление_диаст")[1]);
      if (!isNaN(diast)) {
        if (diast < 60) diag = "Низкое диастолическое давление";
        else if (diast > 90) diag = "Высокое диастолическое давление";
      }
    }

    // ЧСС
    if (s.includes("чсс")) {
      const hr = parseInt(s.split("чсс")[1]);
      if (!isNaN(hr)) {
        if (hr < 50) diag = "Брадикардия (низкий пульс)";
        else if (hr > 100) diag = "Тахикардия (высокий пульс)";
      }
    }

    // Температура
    if (s.includes("температура_тело")) {
      const t = parseFloat(s.split("температура_тело")[1]);
      if (!isNaN(t)) {
        if (t > 38) diag = "Лихорадка (высокая температура)";
        else if (t < 35) diag = "Гипотермия (низкая температура)";
      }
    }

    // Сатурация
    if (s.includes("сатурация")) {
      const spo = parseInt(s.split("сатурация")[1]);
      if (!isNaN(spo) && spo < 94) {
        diag = "Гипоксемия (низкая сатурация)";
      }
    }

    // Частота дыхания
    if (s.includes("дыхание")) {
      const rr = parseInt(s.split("дыхание")[1]);
      if (!isNaN(rr)) {
        if (rr < 12) diag = "Брадипноэ (редкое дыхание)";
        else if (rr > 20) diag = "Тахипноэ (частое дыхание)";
      }
    }

    // --- Симптомы и неврология ---

    if (s.includes("кашель") && s.includes("температура")) {
      diag = "Вероятно: ОРВИ или грипп";
    } else if (s.includes("кашель") && s.includes("одышка")) {
      diag = "Вероятно: бронхит или пневмония";
    } else if (s.includes("боль") && s.includes("слабость")) {
      diag = "Возможен воспалительный процесс или интоксикация";
    } else if (s.includes("головная боль") && s.includes("головокружение")) {
      diag = "Мигрень или нарушение мозгового кровообращения";
    } else if (s.includes("онемение") && s.includes("нарушение речи")) {
      diag = "Подозрение на инсульт — срочно обратиться за помощью";
    }

    // --- Зоны тела (визуальный пациент) ---

    if (s.includes("боль_грудь") && s.includes("одышка")) {
      diag = "Боль в груди и одышка — возможная кардиологическая патология";
    } else if (s.includes("боль_живот")) {
      diag = "Боль в животе — возможная гастроэнтерологическая патология";
    } else if (s.includes("боль_левая_рука") && s.includes("боль_грудь")) {
      diag = "Боль в груди и левой руке — возможный инфаркт миокарда";
    } else if (s.includes("боль_голова") && s.includes("судороги")) {
      diag = "Боль в голове и судороги — возможное неврологическое состояние";
    }

    setDiagnosis(diag);
    setHistory((prev) => [
      ...prev,
      { id: Date.now(), name, age, diagnosis: diag },
    ]);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Виртуальный пациент</h1>

      {/* Имя */}
      <label>Имя пациента:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя"
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* Возраст */}
      <label>Возраст:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Возраст"
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* Симптомы */}
      <h3>Симптомы</h3>
      <div style={{ marginBottom: "12px" }}>
        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("кашель")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " кашель")
                : setSymptoms(symptoms.replace("кашель", ""))
            }
          />
          Кашель
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("температура")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " температура")
                : setSymptoms(symptoms.replace("температура", ""))
            }
          />
          Повышенная температура
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("боль")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " боль")
                : setSymptoms(symptoms.replace("боль", ""))
            }
          />
          Боль
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("одышка")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " одышка")
                : setSymptoms(symptoms.replace("одышка", ""))
            }
          />
          Одышка
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("слабость")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " слабость")
                : setSymptoms(symptoms.replace("слабость", ""))
            }
          />
          Слабость
        </label>
      </div>

      {/* Неврологические симптомы */}
      <h3>Неврологические симптомы</h3>
      <div style={{ marginBottom: "12px" }}>
        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("головная боль")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " головная боль")
                : setSymptoms(symptoms.replace("головная боль", ""))
            }
          />
          Головная боль
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("головокружение")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " головокружение")
                : setSymptoms(symptoms.replace("головокружение", ""))
            }
          />
          Головокружение
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("онемение")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " онемение")
                : setSymptoms(symptoms.replace("онемение", ""))
            }
          />
          Онемение
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("нарушение речи")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " нарушение речи")
                : setSymptoms(symptoms.replace("нарушение речи", ""))
            }
          />
          Нарушение речи
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={symptoms.includes("судороги")}
            onChange={(e) =>
              e.target.checked
                ? setSymptoms(symptoms + " судороги")
                : setSymptoms(symptoms.replace("судороги", ""))
            }
          />
          Судороги
        </label>
      </div>

      {/* Визуальный пациент */}
      <h3>Визуальный пациент</h3>
      <p>Нажмите на область тела, где есть боль или дискомфорт:</p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <svg
          width="180"
          height="400"
          viewBox="0 0 180 400"
          style={{ cursor: "pointer" }}
        >
          {/* Голова */}
          <circle
            cx="90"
            cy="50"
            r="40"
            fill={symptoms.includes("боль_голова") ? "#ff6b6b" : "#d9d9d9"}
            onClick={() =>
              setSymptoms(
                symptoms.includes("боль_голова")
                  ? symptoms.replace("боль_голова", "")
                  : symptoms + " боль_голова"
              )
            }
          />

          {/* Грудь */}
          <rect
            x="50"
            y="100"
            width="80"
            height="80"
            fill={symptoms.includes("боль_грудь") ? "#ff6b6b" : "#d9d9d9"}
            onClick={() =>
              setSymptoms(
                symptoms.includes("боль_грудь")
                  ? symptoms.replace("боль_грудь", "")
                  : symptoms + " боль_грудь"
              )
            }
          />

          {/* Живот */}
          <rect
            x="50"
            y="190"
            width="80"
            height="80"
            fill={symptoms.includes("боль_живот") ? "#ff6b6b" : "#d9d9d9"}
            onClick={() =>
              setSymptoms(
                symptoms.includes("боль_живот")
                  ? symptoms.replace("боль_живот", "")
                  : symptoms + " боль_живот"
              )
            }
          />

          {/* Левая рука */}
          <rect
            x="20"
            y="110"
            width="25"
            height="140"
            fill={symptoms.includes("боль_левая_рука") ? "#ff6b6b" : "#d9d9d9"}
            onClick={() =>
              setSymptoms(
                symptoms.includes("боль_левая_рука")
                  ? symptoms.replace("боль_левая_рука", "")
                  : symptoms + " боль_левая_рука"
              )
            }
          />

          {/* Правая рука */}
          <rect
            x="135"
            y="110"
            width="25"
            height="140"
            fill={symptoms.includes("боль_правая_рука") ? "#ff6b6b" : "#d9d9d9"}
            onClick={() =>
              setSymptoms(
                symptoms.includes("боль_правая_рука")
                  ? symptoms.replace("боль_правая_рука", "")
                  : symptoms + " боль_правая_рука"
              )
            }
          />

          {/* Левая нога */}
          <rect
            x="60"
            y="270"
            width="25"
            height="90"
            fill={symptoms.includes("боль_левая_нога") ? "#ff6b6b" : "#d9d9d9"}
            onClick={() =>
              setSymptoms(
                symptoms.includes("боль_левая_нога")
                  ? symptoms.replace("боль_левая_нога", "")
                  : symptoms + " боль_левая_нога"
              )
            }
          />

          {/* Правая нога */}
          <rect
            x="95"
            y="270"
            width="25"
            height="90"
            fill={symptoms.includes("боль_правая_нога") ? "#ff6b6b" : "#d9d9d9"}
            onClick={() =>
              setSymptoms(
                symptoms.includes("боль_правая_нога")
                  ? symptoms.replace("боль_правая_нога", "")
                  : symptoms + " боль_правая_нога"
              )
            }
          />
        </svg>
      </div>

      {/* Давление */}
      <h3>Артериальное давление</h3>
      <div style={{ marginBottom: "12px" }}>
        <label>Систолическое:</label>
        <input
          type="number"
          placeholder="120"
          onChange={(e) =>
            setSymptoms(symptoms + " давление_сист " + e.target.value)
          }
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

        <label>Диастолическое:</label>
        <input
          type="number"
          placeholder="80"
          onChange={(e) =>
            setSymptoms(symptoms + " давление_диаст " + e.target.value)
          }
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />
      </div>

      {/* ЧСС */}
      <h3>Частота сердечных сокращений (ЧСС)</h3>
      <input
        type="number"
        placeholder="Например: 75"
        onChange={(e) => setSymptoms(symptoms + " чсс " + e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* Температура */}
      <h3>Температура тела</h3>
      <input
        type="number"
        placeholder="Например: 36.6"
        onChange={(e) =>
          setSymptoms(symptoms + " температура_тело " + e.target.value)
        }
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* Сатурация */}
      <h3>Сатурация (SpO₂)</h3>
      <input
        type="number"
        placeholder="Например: 98"
        onChange={(e) => setSymptoms(symptoms + " сатурация " + e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* Частота дыхания */}
      <h3>Частота дыхания</h3>
      <input
        type="number"
        placeholder="Например: 16"
        onChange={(e) => setSymptoms(symptoms + " дыхание " + e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* Кнопка */}
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Анализировать
      </button>

      {/* Диагноз */}
      {diagnosis && (
        <div
          style={{
            padding: "15px",
            background: "#f3f4f6",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
            marginBottom: "20px",
          }}
        >
          <h3>Предварительный диагноз:</h3>
          <p>{diagnosis}</p>
        </div>
      )}

      {/* Карточка пациента */}
      <div
        style={{
          padding: "15px",
          background: "#eef2ff",
          borderRadius: "6px",
          border: "1px solid #c7d2fe",
          marginBottom: "20px",
        }}
      >
        <h3>Карточка пациента</h3>
        <p>
          <strong>Имя:</strong> {name || "не указано"}
        </p>
        <p>
          <strong>Возраст:</strong> {age || "не указан"}
        </p>
        <p>
          <strong>Текущий диагноз:</strong>{" "}
          {diagnosis || "диагноз ещё не сформирован"}
        </p>
      </div>

      {/* История болезни */}
      <div
        style={{
          padding: "15px",
          background: "#f9fafb",
          borderRadius: "6px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3>История случаев</h3>
        {history.length === 0 && <p>Пока нет сохранённых случаев.</p>}
        {history.length > 0 && (
          <ul>
            {history.map((h) => (
              <li key={h.id} style={{ marginBottom: "8px" }}>
                <strong>{h.name || "Без имени"}</strong>, {h.age || "возраст не указан"} —{" "}
                {h.diagnosis}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
