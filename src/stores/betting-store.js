import { defineStore } from 'pinia'
import { api } from '../boot/axios.js'

const SUPABASE_URL = 'https://uzzthlvvebagmuqtpsba.supabase.co'
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6enRobHZ2ZWJhZ211cXRwc2JhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgzOTA1MywiZXhwIjoyMDY1NDE1MDUzfQ.0iD8YXwjmMmEvBXCnwwaIDQFrTEuXbbnLgOlbX7uFfc'

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
}
export const useBettingTipsStore = defineStore('betting', {
  state: () => ({
    yesterday_tips: [],
    today_tips: [],
    tomorrow_tips: [],
    yesterday_previews: [],
    today_previews: [],
    tomorrow_previews: [],
  }),

  getters: {
    yesterdayParams: () => {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      const dateStr = d.toISOString().slice(0, 10)
      return { date_key: `eq.${dateStr}` }
    },
    todayParams: () => {
      const d = new Date()
      const dateStr = d.toISOString().slice(0, 10)
      return { date_key: `eq.${dateStr}` }
    },
    tomorrowParams: () => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      const dateStr = d.toISOString().slice(0, 10)
      return { date_key: `eq.${dateStr}` }
    },
  },

  actions: {
    extractTips(nested) {
      return nested?.[0]?.data?.[0]?.data || []
    },
    async fetchYesterdayTips() {
      try {
        const response = await api.get(`${SUPABASE_URL}/rest/v1/footballtips_data`, {
          headers,
          params: this.yesterdayParams,
        })
        this.yesterday_tips = this.extractTips(response.data)
      } catch (error) {
        console.error('Error fetching yesterday tips:', error)
      }
    },
    async fetchTodayTips() {
      try {
        const response = await api.get(`${SUPABASE_URL}/rest/v1/footballtips_data`, {
          headers,
          params: this.todayParams,
        })

        this.today_tips = this.extractTips(response.data)
      } catch (error) {
        console.error('Error fetching today tips:', error)
      }
    },
    async fetchTomorrowTips() {
      try {
        const response = await api.get(`${SUPABASE_URL}/rest/v1/footballtips_data`, {
          headers,
          params: this.tomorrowParams,
        })
        this.tomorrow_tips = this.extractTips(response.data)
      } catch (error) {
        console.error('Error fetching tomorrow tips:', error)
      }
    },
    async fetchYesterdayPreviews() {
      try {
        const response = await api.get(`${SUPABASE_URL}/rest/v1/previews_data`, {
          headers,
          params: this.yesterdayParams,
        })

        const flattened = []
        let counter = 1

        // Flatten and transform the data
        for (const item of response.data) {
          for (const subItem of item.data) {
            for (const html of subItem.data) {
              const matchTitleMatch = html.match(/<h3[^>]*>(.*?)<\/h3>/)
              const matchTitle = matchTitleMatch ? matchTitleMatch[1] : 'Unknown Match'

              flattened.push({
                id: counter++,
                match: matchTitle,
                data: html,
              })
            }
          }
        }

        this.yesterday_previews = flattened
      } catch (error) {
        console.error('Error fetching tomorrow previews:', error)
      }
    },
    async fetchTodayPreviews() {
      try {
        const response = await api.get(`${SUPABASE_URL}/rest/v1/previews_data`, {
          headers,
          params: this.todayParams,
        })

        const flattened = []
        let counter = 1

        // Flatten and transform the data
        for (const item of response.data) {
          for (const subItem of item.data) {
            for (const html of subItem.data) {
              const matchTitleMatch = html.match(/<h3[^>]*>(.*?)<\/h3>/)
              const matchTitle = matchTitleMatch ? matchTitleMatch[1] : 'Unknown Match'

              flattened.push({
                id: counter++,
                match: matchTitle,
                data: html,
              })
            }
          }
        }

        this.today_previews = flattened
      } catch (error) {
        console.error('Error fetching tomorrow previews:', error)
      }
    },
    async fetchTomorrowPreviews() {
      try {
        const response = await api.get(`${SUPABASE_URL}/rest/v1/previews_data`, {
          headers,
          params: this.tomorrowParams,
        })

        const flattened = []
        let counter = 1

        // Flatten and transform the data
        for (const item of response.data) {
          for (const subItem of item.data) {
            for (const html of subItem.data) {
              const matchTitleMatch = html.match(/<h3[^>]*>(.*?)<\/h3>/)
              const matchTitle = matchTitleMatch ? matchTitleMatch[1] : 'Unknown Match'

              flattened.push({
                id: counter++,
                match: matchTitle,
                data: html,
              })
            }
          }
        }

        this.tomorrow_previews = flattened
      } catch (error) {
        console.error('Error fetching tomorrow previews:', error)
      }
    },
  },
})
