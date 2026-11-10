import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { FieldTask, TaskStatus } from '../../types';
import { MAHARASHTRA_DISTRICTS, TALUKAS_BY_DISTRICT } from '../../data/maharashtraData';
import { ClipboardCheck, PlusCircle, CheckCircle2, Clock, MapPin, User, FileText, Phone } from 'lucide-react';

export const FieldTaskManager: React.FC = () => {
  const { user, showNotification } = useApp();
  const [tasks, setTasks] = useState<FieldTask[]>(() => api.getFieldTasks());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<FieldTask | null>(tasks[0] || null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [newNotes, setNewNotes] = useState('');

  // New task form fields
  const [newTitle, setNewTitle] = useState('');
  const [newDistrict, setNewDistrict] = useState('Latur');
  const [newTaluka, setNewTaluka] = useState('Ausa');
  const [newVillage, setNewVillage] = useState('Belkund');
  const [newAssignedTo, setNewAssignedTo] = useState('K. R. Kulkarni (Krishi Sahayak)');
  const [newPhone, setNewPhone] = useState('+91 98220 11442');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [newDueDate, setNewDueDate] = useState('2026-10-15');
  const [newDesc, setNewDesc] = useState('');

  const filteredTasks = tasks.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    return true;
  });

  const handleUpdateStatus = (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updated: FieldTask = {
      ...task,
      status: newStatus,
      fieldNotes: newNotes ? `${task.fieldNotes ? task.fieldNotes + '\n' : ''}${newNotes}` : task.fieldNotes,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : task.completedAt,
      updatedAt: new Date().toISOString()
    };

    api.saveFieldTask(updated);
    setTasks(api.getFieldTasks());
    setSelectedTask(updated);
    setNewNotes('');
    showNotification(`Field task ${task.id} updated to ${newStatus.toUpperCase()}`);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: FieldTask = {
      id: `TASK-MH-${Date.now().toString().slice(-3)}`,
      title: newTitle,
      district: newDistrict,
      taluka: newTaluka,
      village: newVillage,
      assignedTo: newAssignedTo,
      assignedOfficerPhone: newPhone,
      priority: newPriority,
      dueDate: newDueDate,
      status: 'assigned',
      taskDescription: newDesc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    api.saveFieldTask(newTask);
    setTasks(api.getFieldTasks());
    setShowCreateModal(false);
    showNotification(`Field inspection task ${newTask.id} assigned to ${newAssignedTo}.`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Field Inspection Task Allocation Hub
          </h1>
          <p className="text-xs text-slate-500">
            Coordinate ground crop loss verification & farm pond audits with Krishi Sahayaks
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Assign Field Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['all', 'unassigned', 'assigned', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-xl font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === status
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Grid: Task list + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Task Cards List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredTasks.map((task) => {
            const isSelected = selectedTask?.id === task.id;
            return (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 shadow-md ring-1 ring-emerald-600'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="font-bold text-slate-700">{task.id}</span>
                      <span>·</span>
                      <span>Due: {task.dueDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {task.taskDescription}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      task.priority === 'high'
                        ? 'bg-rose-100 text-rose-800'
                        : task.priority === 'medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{task.village || task.taluka}, {task.district}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-700">
                      {task.assignedTo}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        task.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : task.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Task Inspector */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          {selectedTask ? (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Task ID: {selectedTask.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedTask.title}
                </h3>
                <p className="text-slate-500 mt-1">
                  Target Location: {selectedTask.village || ''} {selectedTask.taluka}, {selectedTask.district}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700">Scope of Work:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {selectedTask.taskDescription}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700">Assigned Field Officer:</span>
                <p className="text-slate-900 font-bold mt-0.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{selectedTask.assignedTo}</span>
                </p>
                {selectedTask.assignedOfficerPhone && (
                  <p className="text-slate-500 font-mono text-[11px] mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{selectedTask.assignedOfficerPhone}</span>
                  </p>
                )}
              </div>

              {selectedTask.fieldNotes && (
                <div>
                  <span className="font-semibold text-slate-700">Logged Ground Findings:</span>
                  <div className="mt-1 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950 whitespace-pre-line leading-relaxed">
                    {selectedTask.fieldNotes}
                  </div>
                </div>
              )}

              {/* Add Field Note Input */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block font-semibold text-slate-700 mb-1">
                  Append Field Inspection Observation
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Visited 8 plots. Vertisol cracks 6cm deep. Recorded 20% pod drop..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* State Transitions */}
              <div className="space-y-1.5 pt-1">
                {selectedTask.status === 'assigned' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedTask.id, 'in_progress')}
                    className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-xs cursor-pointer"
                  >
                    Mark Task In Progress
                  </button>
                )}

                {selectedTask.status === 'in_progress' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedTask.id, 'completed')}
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs cursor-pointer"
                  >
                    Complete & File Ground Report
                  </button>
                )}

                {selectedTask.status === 'completed' && (
                  <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-xl font-semibold text-center text-xs">
                    Task Completed on {new Date(selectedTask.completedAt || selectedTask.updatedAt || selectedTask.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a task to view field findings or update status.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Assign Task */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Assign Field Inspection Task
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Allocate ground crop cutting or flower drop verification to taluka field workers.
            </p>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Verify Pod Abortion & Soil Moisture in Nilanga"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District
                  </label>
                  <select
                    value={newDistrict}
                    onChange={(e) => {
                      setNewDistrict(e.target.value);
                      const talukas = TALUKAS_BY_DISTRICT[e.target.value.toLowerCase()] || ['Central'];
                      setNewTaluka(talukas[0]);
                    }}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Taluka
                  </label>
                  <input
                    type="text"
                    value={newTaluka}
                    onChange={(e) => setNewTaluka(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Village
                  </label>
                  <input
                    type="text"
                    value={newVillage}
                    onChange={(e) => setNewVillage(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assigned Worker Name
                  </label>
                  <input
                    type="text"
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Instructions & Protocol
                </label>
                <textarea
                  required
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Inspect 20 random plots, examine flower shed rate, measure soil cracking..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 text-xs font-bold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
