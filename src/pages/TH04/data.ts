
export const KEYS = {
  BOOKS: "vb_books",
  DECISIONS: "vb_decisions",
  FIELDS: "vb_fields",
  DIPLOMAS: "vb_diplomas",
} as const;


export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}


export function save(key: string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data));
}
