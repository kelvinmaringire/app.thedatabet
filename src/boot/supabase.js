import { boot } from 'quasar/wrappers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uzzthlvvebagmuqtpsba.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6enRobHZ2ZWJhZ211cXRwc2JhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgzOTA1MywiZXhwIjoyMDY1NDE1MDUzfQ.0iD8YXwjmMmEvBXCnwwaIDQFrTEuXbbnLgOlbX7uFfc'

const supabase = createClient(supabaseUrl, supabaseKey)

export default boot(({ app }) => {
  // Make it available globally via this.$supabase
  app.config.globalProperties.$supabase = supabase
})

export { supabase }
