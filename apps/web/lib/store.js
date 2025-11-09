import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "apps", "web", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function ensureDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify({ events: {}, roots: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export async function createEvent({ organizer, eventId, startTs, endTs, metadata }) {
  const db = ensureDb();
  const nonce = crypto.randomBytes(8).toString("hex");
  db.events[eventId] = {
    organizer,
    eventId,
    startTs: startTs || Date.now(),
    endTs: endTs || Date.now() + 1000 * 60 * 60,
    metadata: metadata || "",
    nonce,
    createdAt: Date.now()
  };
  saveDb(db);
  return db.events[eventId];
}

export async function rotateNonce(eventId) {
  const db = ensureDb();
  if (!db.events[eventId]) throw new Error("event not found");
  const nonce = crypto.randomBytes(8).toString("hex");
  db.events[eventId].nonce = nonce;
  saveDb(db);
  return nonce;
}

export async function publishCommitment(eventId, commitment) {
  const db = ensureDb();
  if (!db.events[eventId]) throw new Error("event not found");
  if (!db.roots[eventId]) db.roots[eventId] = [];
  const prev = db.roots[eventId].length ? db.roots[eventId][db.roots[eventId].length - 1].root : null;
  const h = crypto.createHash("sha256");
  if (prev) h.update(prev);
  h.update(commitment);
  const root = h.digest("hex");
  const entry = {
    root,
    createdAt: Date.now(),
    batchIndex: db.roots[eventId].length,
    commitmentCount: 1
  };
  db.roots[eventId].push(entry);
  saveDb(db);
  return entry;
}

export async function listRoots() {
  const db = ensureDb();
  return db.roots;
}

export async function getEvent(eventId) {
  const db = ensureDb();
  return db.events[eventId];
}
