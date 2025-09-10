// frontend/src/hooks/useSummaries.js
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * useSummaries : génère des résumés IA pour les articles visibles
 * - articles : array d'articles
 * - visibleCount : nombre d'articles visibles (Show More)
 *
 * garantit :
 * - pas de requêtes vides
 * - pas de doublons (in-flight guard)
 * - annulation des requêtes si articles/visibleCount changent
 */
export default function useSummaries(articles, visibleCount) {
  const [summaries, setSummaries] = useState({});
  const inFlightRef = useRef(new Set()); // clés en cours de requête
  const abortMapRef = useRef(new Map()); // key -> AbortController

  // util: nettoie HTML basique et entités communes (améliorable)
  const cleanText = (raw) => {
    if (!raw) return "";
    let s = raw.replace(/<[^>]*>/g, " "); // retire balises HTML
    s = s.replace(/&nbsp;|&#160;/g, " ");
    s = s.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&#8217;/g, "'");
    s = s.replace(/\s+/g, " ").trim();
    return s;
  };

  useEffect(() => {
    if (!articles || articles.length === 0) return;

    const visible = articles.slice(0, visibleCount);

    // cancel any in-flight requests for keys not in visible (cleanup)
    const visibleKeys = new Set(visible.map((a) => a.url || a.title));
    for (const [key, controller] of abortMapRef.current.entries()) {
      if (!visibleKeys.has(key)) {
        try {
          controller.abort();
        } catch {
          // Intentionally ignored: abort may throw if already aborted
        }
        abortMapRef.current.delete(key);
        inFlightRef.current.delete(key);
      }
    }

    // iterate visible articles and request summaries if needed
    visible.forEach((article) => {
      const key = article.url || article.title;
      if (!key) return;

      // si on a déjà un résumé, ne rien faire
      if (summaries[key]) return;

      // si une requête pour cette clé est déjà en cours, skip
      if (inFlightRef.current.has(key)) return;

      // prépare le texte à envoyer (title + description + content)
      const rawText = `${article.title || ""}. ${article.description || ""}. ${article.content || ""}`;
      const text = cleanText(rawText);

      // si texte vide ou trop court, skip
      if (!text || text.length < 50) {
        setSummaries((prev) => ({
          ...prev,
          [key]: "Pas assez de contenu pour résumé",
        }));
        return;
      }

      // ready -> lance la requête
      inFlightRef.current.add(key);
      const controller = new AbortController();
      abortMapRef.current.set(key, controller);

      fetch(`${API_URL}/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Erreur résumé");
          return res.json();
        })
        .then((data) => {
          // data.summary ou data.summary_text selon backend — essaye les deux
          const summaryText =
            data?.summary || data?.summary_text || data?.result || null;
          if (
            summaryText &&
            typeof summaryText === "string" &&
            summaryText.trim().length > 0
          ) {
            setSummaries((prev) => ({ ...prev, [key]: summaryText }));
          } else {
            setSummaries((prev) => ({ ...prev, [key]: "Résumé indisponible" }));
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            /* aborted -> ignore */
          } else {
            console.error("Erreur fetch summary", err);
            setSummaries((prev) => ({ ...prev, [key]: "Résumé indisponible" }));
          }
        })
        .finally(() => {
          inFlightRef.current.delete(key);
          abortMapRef.current.delete(key);
        });
    });

    // cleanup à la destruction du effect (annule toutes les requêtes lancées ici)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      for (const controller of abortMapRef.current.values()) {
        try {
          controller.abort();
        } catch {
          // Intentionally ignored: abort may throw if already aborted
        }
      }
      abortMapRef.current.clear();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inFlightRef.current.clear();
    };
    // IMPORTANT: ne pas ajouter `summaries` dans la liste des dépendances,
    // pour éviter la boucle. On veut déclencher seulement quand articles/visibleCount changent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, visibleCount]); // <-- pas de summaries ici

  return { summaries, setSummaries };
}
