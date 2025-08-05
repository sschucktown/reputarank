<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-2">Requests Over Time</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed } from 'vue'
import { useRequestsStore } from '@/stores/requests'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const store = useRequestsStore()

// Example grouping by created_at date (YYYY-MM-DD)
const chartData = computed(() => {
  const groups: Record<string, { [key: string]: number }> = {}

  store.requests.forEach((req) => {
    const date = req.created_at?.slice(0, 10) || 'Unknown'
    if (!groups[date]) groups[date] = { pending: 0, 'in progress': 0, completed: 0 }

    if (groups[date][req.status] !== undefined) {
      groups[date][req.status] += 1
    }
  })

  const dates = Object.keys(groups).sort()

  return {
    labels: dates,
    datasets: [
      {
        label: 'Pending',
        borderColor: '#f59e0b',
        data: dates.map((d) => groups[d].pending),
      },
      {
        label: 'In Progress',
        borderColor: '#3b82f6',
        data: dates.map((d) => groups[d]['in progress']),
      },
      {
        label: 'Completed',
        borderColor: '#10b981',
        data: dates.map((d) => groups[d].completed),
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
}
</script>
