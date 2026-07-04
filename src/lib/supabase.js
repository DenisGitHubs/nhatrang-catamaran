// Клиент Supabase. Работает, только если заданы VITE_SUPABASE_URL и
// VITE_SUPABASE_ANON_KEY (см. .env.example). Если не заданы — supabase === null,
// и приложение продолжает работать без бэкенда (текущий режим).
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null
export const isSupabaseReady = Boolean(supabase)
