
const API_BASE = import.meta.env.VITE_API_URL;

export async function getData() {
  const res = await fetch(`${API_BASE}/api/data`);
  return res.json();
}
