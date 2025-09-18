import { useEffect, useState } from "react";
import api from "../services/api";

const STORAGE = process.env.REACT_APP_STORAGE_BASE_URL || "";

export default function ReceiptsWidget({ expenseId }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const data = await api.Receipts.list(expenseId);
    setFiles(data.receipts || []);
  };

  useEffect(() => {
    if (expenseId) load();
  }, [expenseId]);

  const onUpload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", f);
      await api.Receipts.upload(expenseId, form);
      e.target.value = "";
      await load();
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (id) => {
    await api.Receipts.delete(id);
    await load();
  };

  return (
    <div className="card p-2 mt-2">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="m-0">Računi</h6>
        <input
          type="file"
          onChange={onUpload}
          accept=".png,.jpg,.jpeg,.pdf"
          disabled={uploading}
        />
      </div>
      <ul className="mt-2 mb-0">
        {files.map((r) => (
          <li key={r.id}>
            <a
              href={`${STORAGE}/storage/${r.path}`}
              target="_blank"
              rel="noreferrer"
            >
              {r.mime} · {(r.size / 1024).toFixed(0)} KB
            </a>
            <button
              className="btn btn-sm btn-link text-danger ms-2"
              onClick={() => onDelete(r.id)}
            >
              Obriši
            </button>
          </li>
        ))}
        {!files.length && <li className="text-muted">Nema fajlova.</li>}
      </ul>
    </div>
  );
}
