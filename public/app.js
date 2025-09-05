
const departments = [
  { id: 1, name: "CAD", description: "Design and modeling" },
  { id: 2, name: "CFD", description: "Simulation and analysis" },
  { id: 3, name: "Battery", description: "Battery systems" },
  { id: 4, name: "Electronics", description: "Electronic subsystems" },
  { id: 5, name: "Marketing", description: "Outreach and promotion" }
];

const members = [
  { id: 1, name: "Amit Sharma", specialization: "CAD Designer", department: "CAD", email: "amit@company.in" },
  { id: 2, name: "Priya Singh", specialization: "CFD Analyst", department: "CFD", email: "priya@company.in" },
  { id: 3, name: "Rahul Verma", specialization: "Battery Engineer", department: "Battery", email: "rahul@company.in" },
  { id: 4, name: "Sneha Patel", specialization: "Electronics Lead", department: "Electronics", email: "sneha@company.in" },
  { id: 5, name: "Vikram Rao", specialization: "Marketing Strategist", department: "Marketing", email: "vikram@company.in" },
  { id: 6, name: "Ritu Gupta", specialization: "CAD Modeler", department: "CAD", email: "ritu@company.in" },
  { id: 7, name: "Manish Joshi", specialization: "CFD Tester", department: "CFD", email: "manish@company.in" },
  { id: 8, name: "Anjali Mehta", specialization: "Battery Tester", department: "Battery", email: "anjali@company.in" }
];

const tasks = [
  { id: 1, title: "Design Chassis", status: "Completed", assigned_to: "Amit Sharma", department: "CAD", due_date: "2025-09-10" },
  { id: 2, title: "Simulate Airflow", status: "In Progress", assigned_to: "Priya Singh", department: "CFD", due_date: "2025-09-12" },
  { id: 3, title: "Battery Pack Test", status: "Pending", assigned_to: "Rahul Verma", department: "Battery", due_date: "2025-09-15" },
  { id: 4, title: "PCB Layout", status: "Completed", assigned_to: "Sneha Patel", department: "Electronics", due_date: "2025-09-11" },
  { id: 5, title: "Social Media Campaign", status: "Completed", assigned_to: "Vikram Rao", department: "Marketing", due_date: "2025-09-09" }
];

const printLogs = [
  { id: 1, item_name: "Chassis Drawing", printed_by: "Amit Sharma", department: "CAD", printed_at: "2025-08-22", notes: "Initial print" },
  { id: 2, item_name: "Airflow Report", printed_by: "Priya Singh", department: "CFD", printed_at: "2025-08-23", notes: "" },
  { id: 3, item_name: "Battery Test Sheet", printed_by: "Rahul Verma", department: "Battery", printed_at: "2025-08-24", notes: "" }
];

// --- SPA Navigation ---
const mainContent = document.getElementById('main-content');
document.querySelectorAll('.sidebar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    loadView(btn.dataset.view);
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('bg-indigo-200'));
    btn.classList.add('bg-indigo-200');
  });
});
window.addEventListener('DOMContentLoaded', () => loadView('departments'));

// --- Views ---
function loadView(view) {
  if (view === 'departments') {
    let html = `
      <h1 class="text-2xl font-bold mb-6"><i class="fa-solid fa-building mr-2"></i>Departments</h1>
      <div class="grid md:grid-cols-2 gap-6">
    `;
    for (const dept of departments) {
      html += `
        <div class="bg-white rounded shadow p-4 transition hover:shadow-lg">
          <div class="font-bold text-lg">${dept.name}</div>
          <div class="text-gray-500 mb-2">${dept.description}</div>
          <div class="font-semibold mb-1">Members:</div>
          <ul class="list-disc pl-5 mb-2">
            ${members.filter(m => m.department === dept.name).map(m => `<li>${m.name} (${m.specialization})</li>`).join('') || '<li class="text-gray-400">None</li>'}
          </ul>
          <div class="font-semibold mb-1">Tasks:</div>
          <ul class="list-disc pl-5">
            ${tasks.filter(t => t.department === dept.name).map(t => `<li>${t.title} [${t.status}]</li>`).join('') || '<li class="text-gray-400">None</li>'}
          </ul>
        </div>
      `;
    }
    html += '</div>';
    mainContent.innerHTML = html;
  }
  else if (view === 'members') {
    let html = `
      <h1 class="text-2xl font-bold mb-6"><i class="fa-solid fa-users mr-2"></i>Members</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Specialization</th>
              <th class="px-4 py-2">Department</th>
              <th class="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
    `;
    for (const m of members) {
      html += `
        <tr>
          <td class="px-4 py-2">${m.name}</td>
          <td class="px-4 py-2">${m.specialization}</td>
          <td class="px-4 py-2">${m.department}</td>
          <td class="px-4 py-2">${m.email}</td>
        </tr>
      `;
    }
    html += '</tbody></table></div>';
    mainContent.innerHTML = html;
  }
  else if (view === 'tasks') {
    let html = `
      <h1 class="text-2xl font-bold mb-6"><i class="fa-solid fa-tasks mr-2"></i>Tasks</h1>
      <div class="overflow-x-auto mb-8">
        <table class="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th class="px-4 py-2">Title</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Assigned To</th>
              <th class="px-4 py-2">Department</th>
              <th class="px-4 py-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
    `;
    for (const t of tasks) {
      html += `
        <tr>
          <td class="px-4 py-2">${t.title}</td>
          <td class="px-4 py-2">${t.status}</td>
          <td class="px-4 py-2">${t.assigned_to}</td>
          <td class="px-4 py-2">${t.department}</td>
          <td class="px-4 py-2">${t.due_date}</td>
        </tr>
      `;
    }
    html += '</tbody></table></div>';
    html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="kanban-board">`;
    ['Pending', 'In Progress', 'Completed'].forEach(status => {
      html += `
        <div class="bg-white rounded shadow p-4">
          <h2 class="font-bold mb-2">${status}</h2>
          <div>
            ${tasks.filter(t => t.status === status).map(t => `
              <div class="mb-2 p-2 rounded bg-indigo-50 flex justify-between items-center">
                <span>${t.title}</span>
                <span class="text-xs text-gray-500">${t.assigned_to}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    html += '</div>';
    mainContent.innerHTML = html;
  }
  else if (view === 'printlog') {
    let html = `
      <h1 class="text-2xl font-bold mb-6"><i class="fa-solid fa-print mr-2"></i>Print Log</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th class="px-4 py-2">Item Name</th>
              <th class="px-4 py-2">Printed By</th>
              <th class="px-4 py-2">Department</th>
              <th class="px-4 py-2">Printed At</th>
              <th class="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
    `;
    for (const l of printLogs) {
      html += `
        <tr>
          <td class="px-4 py-2">${l.item_name}</td>
          <td class="px-4 py-2">${l.printed_by}</td>
          <td class="px-4 py-2">${l.department}</td>
          <td class="px-4 py-2">${l.printed_at}</td>
          <td class="px-4 py-2">${l.notes}</td>
        </tr>
      `;
    }
    html += '</tbody></table></div>';
    mainContent.innerHTML = html;
  }
  else if (view === 'analytics') {
    mainContent.innerHTML = `
      <h1 class="text-2xl font-bold mb-6"><i class="fa-solid fa-chart-pie mr-2"></i>Analytics</h1>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="font-semibold mb-2">Task Completion % per Department</h2>
          <canvas id="tasksPie"></canvas>
        </div>
        <div>
          <h2 class="font-semibold mb-2">Number of Prints Over Time</h2>
          <canvas id="printsLine"></canvas>
        </div>
      </div>
    `;
    setTimeout(() => {
      
      const labels = [...new Set(tasks.map(t => t.department))];
      const data = labels.map(dept => {
        const total = tasks.filter(t => t.department === dept).length;
        const completed = tasks.filter(t => t.department === dept && t.status === "Completed").length;
        return total ? Math.round((completed / total) * 100) : 0;
      });
      new Chart(document.getElementById('tasksPie'), {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: ['#6366f1','#60a5fa','#34d399','#fbbf24','#f87171']
          }]
        },
        options: { plugins: { legend: { position: 'bottom' } } }
      });
    
      const printDates = printLogs.map(l => l.printed_at);
      const dateCounts = {};
      printDates.forEach(d => dateCounts[d] = (dateCounts[d] || 0) + 1);
      const lineLabels = Object.keys(dateCounts);
      const lineData = Object.values(dateCounts);
      new Chart(document.getElementById('printsLine'), {
        type: 'line',
        data: {
          labels: lineLabels,
          datasets: [{
            label: 'Prints',
            data: lineData,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: { plugins: { legend: { display: false } } }
      });
    }, 300);
  }

}
